////package com.smart.Uni.service;
////
////import com.smart.Uni.dto.response.UserResponse;
////import com.smart.Uni.entity.User;
////import com.smart.Uni.enums.UserRole;
////import com.smart.Uni.exception.ResourceNotFoundException;
////import com.smart.Uni.repository.UserRepository;
////import lombok.RequiredArgsConstructor;
////import org.springframework.stereotype.Service;
////import java.util.List;
////import java.util.stream.Collectors;
////
////@Service
////@RequiredArgsConstructor
////public class UserService {
////
////    private final UserRepository userRepository;
////
////    public UserResponse getCurrentUser(String email) {
////        User user = userRepository.findByEmail(email)
////                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
////        return toResponse(user);
////    }
////
////    public List<UserResponse> getAllUsers() {
////        return userRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
////    }
////
////    public UserResponse updateRole(Long userId, UserRole role) {
////        User user = userRepository.findById(userId)
////                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
////        user.setRole(role);
////        return toResponse(userRepository.save(user));
////    }
////
////    private UserResponse toResponse(User u) {
////        return UserResponse.builder()
////                .id(u.getId())
////                .email(u.getEmail())
////                .name(u.getName())
////                .picture(u.getPicture())
////                .role(u.getRole())
////                .createdAt(u.getCreatedAt())
////                .build();
////    }
////}
//
//
//package com.smart.Uni.service;
//
//import com.smart.Uni.dto.request.LoginRequest;
//import com.smart.Uni.dto.request.RegisterRequest;
//import com.smart.Uni.dto.response.AuthResponse;
//import com.smart.Uni.dto.response.UserResponse;
//import com.smart.Uni.entity.User;
//import com.smart.Uni.enums.UserRole;
//import com.smart.Uni.repository.UserRepository;
//import com.smart.Uni.security.JwtTokenProvider;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//@RequiredArgsConstructor
//public class UserService {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final JwtTokenProvider jwtTokenProvider;
//
//    public UserResponse getCurrentUser(String email) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new IllegalArgumentException("User not found"));
//        return mapToResponse(user);
//    }
//
//    @Transactional
//    public AuthResponse register(RegisterRequest request) {
//        if (userRepository.existsByEmail(request.getEmail())) {
//            throw new IllegalArgumentException("Email is already registered");
//        }
//
//        User user = User.builder()
//                .email(request.getEmail())
//                .name(request.getName())
//                .provider("local")
//                .password(passwordEncoder.encode(request.getPassword()))
//                .role(UserRole.USER)
//                .build();
//
//        userRepository.save(user);
//
//        String token = jwtTokenProvider.generateToken(user.getEmail());
//        return AuthResponse.builder()
//                .token(token)
//                .user(mapToResponse(user))
//                .build();
//    }
//
//    public AuthResponse login(LoginRequest request) {
//        User user = userRepository.findByEmail(request.getEmail())
//                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
//
//        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//            throw new IllegalArgumentException("Invalid credentials");
//        }
//
//        String token = jwtTokenProvider.generateToken(user.getEmail());
//        return AuthResponse.builder()
//                .token(token)
//                .user(mapToResponse(user))
//                .build();
//    }
//
//    private UserResponse mapToResponse(User user) {
//        return UserResponse.builder()
//                .id(user.getId())
//                .email(user.getEmail())
//                .name(user.getName())
//                .picture(user.getPicture())
//                .role(user.getRole())
//                .createdAt(user.getCreatedAt())
//                .build();
//    }
//}

package com.smart.Uni.service;

import com.smart.Uni.dto.request.LoginRequest;
import com.smart.Uni.dto.request.RegisterRequest;
import com.smart.Uni.dto.response.AuthResponse;
import com.smart.Uni.dto.response.UserResponse;
import com.smart.Uni.entity.User;
import com.smart.Uni.enums.UserRole;
import com.smart.Uni.repository.UserRepository;
import com.smart.Uni.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final NotificationService notificationService;

    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return mapToResponse(user);
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        User user = User.builder()
                .email(request.getEmail())
                .name(request.getName())
                .provider("local")
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.USER)
                .build();

        userRepository.save(user);

        String token = jwtTokenProvider.generateToken(user.getEmail());
        return AuthResponse.builder()
                .token(token)
                .user(mapToResponse(user))
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = jwtTokenProvider.generateToken(user.getEmail());
        return AuthResponse.builder()
                .token(token)
                .user(mapToResponse(user))
                .build();
    }

    /** NEW: list all users for admin */
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /** NEW: update role for a specific user */
    @Transactional
    public UserResponse updateRole(Long id, UserRole role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setRole(role);
//        return mapToResponse(userRepository.save(user));
        User saved = userRepository.save(user);
        notificationService.notifyRoleChanged(saved, role, "Admin");
        return mapToResponse(saved);
    }

    private UserResponse mapToResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .picture(user.getPicture())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }
}