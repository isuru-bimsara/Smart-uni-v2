package com.smart.Uni.service;

import com.smart.Uni.dto.request.TicketRequest;
import com.smart.Uni.dto.response.TicketResponse;
import com.smart.Uni.entity.Ticket;
import com.smart.Uni.entity.User;
import com.smart.Uni.enums.TicketCategory;
import com.smart.Uni.enums.TicketPriority;
import com.smart.Uni.enums.TicketStatus;
import com.smart.Uni.exception.ResourceNotFoundException;
import com.smart.Uni.repository.TicketRepository;
import com.smart.Uni.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    private static final int MAX_IMAGES = 3;
    private static final String UPLOAD_DIR = "uploads/tickets/";

    public TicketResponse createTicket(TicketRequest request, List<MultipartFile> images, String email) throws IOException {
        User reporter = findUserByEmail(email);

        List<String> imagePaths = new ArrayList<>();
        if (images != null && !images.isEmpty()) {
            if (images.size() > MAX_IMAGES) {
                throw new IllegalArgumentException("Maximum " + MAX_IMAGES + " images allowed");
            }
            for (MultipartFile image : images) {
                imagePaths.add(saveImage(image));
            }
        }

        Ticket ticket = Ticket.builder()
                .reporter(reporter)
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory() != null ? request.getCategory() : TicketCategory.OTHER)
                .priority(request.getPriority() != null ? request.getPriority() : TicketPriority.MEDIUM)
                .images(imagePaths)
                .build();
        return toResponse(ticketRepository.save(ticket));
    }

    public List<TicketResponse> getAllTickets() {
        return ticketRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<TicketResponse> getUserTickets(String email) {
        User user = findUserByEmail(email);
        return ticketRepository.findByReporterId(user.getId()).stream()
                .map(this::toResponse).collect(Collectors.toList());
    }

    public TicketResponse getTicketById(Long id) {
        return toResponse(findTicketById(id));
    }

    public TicketResponse updateStatus(Long id, TicketStatus newStatus, String email) {
        Ticket ticket = findTicketById(id);
        validateStatusTransition(ticket.getStatus(), newStatus);
        ticket.setStatus(newStatus);
        if (newStatus == TicketStatus.RESOLVED || newStatus == TicketStatus.CLOSED) {
            ticket.setResolvedAt(LocalDateTime.now());
        }
        Ticket saved = ticketRepository.save(ticket);
        notificationService.notifyTicketUpdated(saved);
        return toResponse(saved);
    }

    public TicketResponse assignTicket(Long ticketId, Long technicianId) {
        Ticket ticket = findTicketById(ticketId);
        User technician = userRepository.findById(technicianId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        ticket.setAssignee(technician);
        if (ticket.getStatus() == TicketStatus.OPEN) {
            ticket.setStatus(TicketStatus.IN_PROGRESS);
        }
        Ticket saved = ticketRepository.save(ticket);
        notificationService.notifyTicketAssigned(saved);
        return toResponse(saved);
    }

    private void validateStatusTransition(TicketStatus current, TicketStatus next) {
        boolean valid = switch (current) {
            case OPEN -> next == TicketStatus.IN_PROGRESS || next == TicketStatus.CLOSED;
            case IN_PROGRESS -> next == TicketStatus.RESOLVED || next == TicketStatus.CLOSED;
            case RESOLVED -> next == TicketStatus.CLOSED;
            case CLOSED -> false;
        };
        if (!valid) {
            throw new IllegalArgumentException("Invalid status transition from " + current + " to " + next);
        }
    }

    private String saveImage(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return UPLOAD_DIR + filename;
    }

    private Ticket findTicketById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }

    private TicketResponse toResponse(Ticket t) {
        Long responseTime = null;
        if (t.getResolvedAt() != null) {
            responseTime = ChronoUnit.MINUTES.between(t.getCreatedAt(), t.getResolvedAt());
        }
        return TicketResponse.builder()
                .id(t.getId())
                .reporterId(t.getReporter().getId())
                .reporterName(t.getReporter().getName())
                .assigneeId(t.getAssignee() != null ? t.getAssignee().getId() : null)
                .assigneeName(t.getAssignee() != null ? t.getAssignee().getName() : null)
                .title(t.getTitle())
                .description(t.getDescription())
                .category(t.getCategory())
                .priority(t.getPriority())
                .status(t.getStatus())
                .images(t.getImages())
                .resolvedAt(t.getResolvedAt())
                .createdAt(t.getCreatedAt())
                .responseTimeMinutes(responseTime)
                .build();
    }

    public TicketResponse updateTicketByUser(Long id, TicketRequest request, String email) {
        Ticket ticket = findTicketById(id);
        User user = findUserByEmail(email);

        // Allow update only if the user is the reporter (owner)
        if (!ticket.getReporter().getId().equals(user.getId())) {
            throw new RuntimeException("You can only update your own tickets.");
        }
        // Only allow editing if ticket is OPEN or IN_PROGRESS
        if (ticket.getStatus() == TicketStatus.RESOLVED || ticket.getStatus() == TicketStatus.CLOSED) {
            throw new RuntimeException("Cannot update a resolved or closed ticket.");
        }
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        if (request.getCategory() != null) ticket.setCategory(request.getCategory());
        if (request.getPriority() != null) ticket.setPriority(request.getPriority());
        Ticket saved = ticketRepository.save(ticket);
        return toResponse(saved);
    }

    public void deleteTicketByUser(Long id, String email) {
        Ticket ticket = findTicketById(id);
        User user = findUserByEmail(email);

        if (!ticket.getReporter().getId().equals(user.getId())) {
            throw new RuntimeException("You can only delete your own tickets.");
        }
        if (!(ticket.getStatus() == TicketStatus.OPEN || ticket.getStatus() == TicketStatus.IN_PROGRESS)) {
            throw new RuntimeException("Only open/in-progress tickets can be deleted.");
        }
        ticketRepository.deleteById(id);
    }

//    // Add this in TicketService
//    public List<TicketResponse> getAssignedTickets(String email, TicketCategory category) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
//
//        List<Ticket> tickets;
//        if (category != null) {
//            tickets = ticketRepository.findByAssigneeIdAndCategory(user.getId(), category);
//        } else {
//            tickets = ticketRepository.findByAssigneeId(user.getId());
//        }
//        return tickets.stream().map(this::toResponse).collect(Collectors.toList());
//    }

    public List<TicketResponse> getAssignedTickets(String email, TicketCategory category) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Ticket> tickets;

        if (category != null) {
            tickets = ticketRepository.findByAssigneeIdAndCategory(user.getId(), category);
        } else {
            tickets = ticketRepository.findByAssigneeId(user.getId());
        }

        return tickets.stream().map(this::toResponse).collect(Collectors.toList());
    }


}
