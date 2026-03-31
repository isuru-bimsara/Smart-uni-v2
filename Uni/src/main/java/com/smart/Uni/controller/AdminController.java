package com.smart.Uni.controller;

import com.smart.Uni.dto.response.ApiResponse;
import com.smart.Uni.dto.response.UserResponse;
import com.smart.Uni.enums.BookingStatus;
import com.smart.Uni.enums.UserRole;
import com.smart.Uni.repository.BookingRepository;
import com.smart.Uni.repository.TicketRepository;
import com.smart.Uni.repository.UserRepository;
import com.smart.Uni.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final TicketRepository ticketRepository;

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.success(userService.getAllUsers()));
    }

    @PatchMapping("/users/{id}/role")
    public ResponseEntity<ApiResponse<UserResponse>> updateUserRole(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        UserRole role = UserRole.valueOf(body.get("role"));
        return ResponseEntity.ok(ApiResponse.success("Role updated", userService.updateRole(id, role)));
    }

//    @GetMapping("/stats")
//    public Map<String, Object> getStats() {
//
//        long users = userRepository.count();
//        long bookings = bookingRepository.count();
//        long pending = bookingRepository.countByStatus(BookingStatus.PENDING);
//        long tickets = ticketRepository.count();
//
//        return Map.of(
//                "users", users,
//                "bookings", bookings,
//                "pendingBookings", pending,
//                "tickets", tickets
//        );
//    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        // Basic Counts
        long users = userRepository.count();
        long bookings = bookingRepository.count();
        long pending = bookingRepository.countByStatus(BookingStatus.PENDING);
        long tickets = ticketRepository.count();

        // Data for charts (Example: Bookings by Status for Pie Chart)
        List<Map<String, Object>> bookingDistribution = List.of(
                Map.of("name", "Approved", "value", bookingRepository.countByStatus(BookingStatus.APPROVED)),
                Map.of("name", "Pending", "value", pending),
                Map.of("name", "Rejected", "value", bookingRepository.countByStatus(BookingStatus.REJECTED))
        );

        return Map.of(
                "users", users,
                "bookings", bookings,
                "pendingBookings", pending,
                "tickets", tickets,
                "distribution", bookingDistribution
        );
    }
}
