//package com.smart.Uni.controller;
//
//import com.smart.Uni.dto.response.ApiResponse;
//import com.smart.Uni.dto.response.UserResponse;
//import com.smart.Uni.enums.BookingStatus;
//import com.smart.Uni.enums.UserRole;
//import com.smart.Uni.repository.BookingRepository;
//import com.smart.Uni.repository.TicketRepository;
//import com.smart.Uni.repository.UserRepository;
//import com.smart.Uni.service.UserService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.time.LocalTime;
//import java.time.format.TextStyle;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Locale;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/admin")
//@PreAuthorize("hasRole('ADMIN')")
//@RequiredArgsConstructor
//public class AdminController {
//
//    private final UserService userService;
//    private final UserRepository userRepository;
//    private final BookingRepository bookingRepository;
//    private final TicketRepository ticketRepository;
//
//    @GetMapping("/users")
//    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
//        return ResponseEntity.ok(ApiResponse.success(userService.getAllUsers()));
//    }
//
//    @PatchMapping("/users/{id}/role")
//    public ResponseEntity<ApiResponse<UserResponse>> updateUserRole(
//            @PathVariable Long id,
//            @RequestBody Map<String, String> body) {
//        UserRole role = UserRole.valueOf(body.get("role"));
//        return ResponseEntity.ok(ApiResponse.success("Role updated", userService.updateRole(id, role)));
//    }
//
////
////
////    @GetMapping("/stats")
////    public Map<String, Object> getStats() {
////        // Basic Counts
////        long users = userRepository.count();
////        long bookings = bookingRepository.count();
////        long pending = bookingRepository.countByStatus(BookingStatus.PENDING);
////        long tickets = ticketRepository.count();
////
////        // Data for charts (Example: Bookings by Status for Pie Chart)
////        List<Map<String, Object>> bookingDistribution = List.of(
////                Map.of("name", "Approved", "value", bookingRepository.countByStatus(BookingStatus.APPROVED)),
////                Map.of("name", "Pending", "value", pending),
////                Map.of("name", "Rejected", "value", bookingRepository.countByStatus(BookingStatus.REJECTED))
////        );
////
////        return Map.of(
////                "users", users,
////                "bookings", bookings,
////                "pendingBookings", pending,
////                "tickets", tickets,
////                "distribution", bookingDistribution
////        );
////    }
//
//    @GetMapping("/stats")
//    public Map<String, Object> getStats() {
//        // 1. Basic Absolute Counts
//        long usersCount = userRepository.count();
//        long bookingsCount = bookingRepository.count();
//        long pendingBookings = bookingRepository.countByStatus(BookingStatus.PENDING);
//        long ticketsCount = ticketRepository.count();
//
//        // 2. Booking Distribution (Pie Chart)
//        List<Map<String, Object>> distribution = List.of(
//                Map.of("name", "Approved", "value", bookingRepository.countByStatus(BookingStatus.APPROVED)),
//                Map.of("name", "Pending", "value", pendingBookings),
//                Map.of("name", "Rejected", "value", bookingRepository.countByStatus(BookingStatus.REJECTED))
//        );
//
//        // 3. Generate Time-Series Data (Last 7 Days)
//        List<Map<String, Object>> userGrowth = new ArrayList<>();
//        List<Map<String, Object>> activityTrends = new ArrayList<>();
//
//        for (int i = 6; i >= 0; i--) {
//            LocalDate date = LocalDate.now().minusDays(i);
//            LocalDateTime startOfDay = date.atStartOfDay();
//            LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
//
//            String dayName = date.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
//
//            // Fetch real counts from DB for this specific day
//            long dailyUsers = userRepository.countByCreatedAtBetween(startOfDay, endOfDay);
//            long dailyBookings = bookingRepository.countByCreatedAtBetween(startOfDay, endOfDay);
//            long dailyTickets = ticketRepository.countByCreatedAtBetween(startOfDay, endOfDay);
//
//            // Format for Bar Chart (User Growth)
//            userGrowth.add(Map.of(
//                    "name", dayName,
//                    "count", dailyUsers
//            ));
//
//            // Format for Composed Chart (Activity Trends)
//            activityTrends.add(Map.of(
//                    "name", dayName,
//                    "bookings", dailyBookings,
//                    "tickets", dailyTickets
//            ));
//        }
//
//        return Map.of(
//                "users", usersCount,
//                "bookings", bookingsCount,
//                "pendingBookings", pendingBookings,
//                "tickets", ticketsCount,
//                "distribution", distribution,
//                "userGrowth", userGrowth,
//                "activityTrends", activityTrends
//        );
//    }
//
//
//}


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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.*;

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

    // NEW: ban user
    @PatchMapping("/users/{id}/ban")
    public ResponseEntity<ApiResponse<UserResponse>> banUser(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body) {
        String reason = body == null ? null : body.get("reason");
        return ResponseEntity.ok(ApiResponse.success("User banned", userService.banUser(id, reason)));
    }

    // NEW: unban user
    @PatchMapping("/users/{id}/unban")
    public ResponseEntity<ApiResponse<UserResponse>> unbanUser(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("User unbanned", userService.unbanUser(id)));
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        long usersCount = userRepository.count();
        long bookingsCount = bookingRepository.count();
        long pendingBookings = bookingRepository.countByStatus(BookingStatus.PENDING);
        long ticketsCount = ticketRepository.count();

        List<Map<String, Object>> distribution = List.of(
                Map.of("name", "Approved", "value", bookingRepository.countByStatus(BookingStatus.APPROVED)),
                Map.of("name", "Pending", "value", pendingBookings),
                Map.of("name", "Rejected", "value", bookingRepository.countByStatus(BookingStatus.REJECTED))
        );

        List<Map<String, Object>> userGrowth = new ArrayList<>();
        List<Map<String, Object>> activityTrends = new ArrayList<>();

        for (int i = 6; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
            String dayName = date.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);

            long dailyUsers = userRepository.countByCreatedAtBetween(startOfDay, endOfDay);
            long dailyBookings = bookingRepository.countByCreatedAtBetween(startOfDay, endOfDay);
            long dailyTickets = ticketRepository.countByCreatedAtBetween(startOfDay, endOfDay);

            userGrowth.add(Map.of("name", dayName, "count", dailyUsers));
            activityTrends.add(Map.of("name", dayName, "bookings", dailyBookings, "tickets", dailyTickets));
        }

        return Map.of(
                "users", usersCount,
                "bookings", bookingsCount,
                "pendingBookings", pendingBookings,
                "tickets", ticketsCount,
                "distribution", distribution,
                "userGrowth", userGrowth,
                "activityTrends", activityTrends
        );
    }
}