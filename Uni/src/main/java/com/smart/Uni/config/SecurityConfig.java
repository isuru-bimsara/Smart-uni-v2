//
//package com.smart.Uni.config;
//
//import com.smart.Uni.security.JwtAuthenticationFilter;
//import com.smart.Uni.security.OAuth2AuthenticationSuccessHandler;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.web.cors.*;
//
//import java.util.List;
//
//@Configuration
//@EnableWebSecurity
//@EnableMethodSecurity
//@RequiredArgsConstructor
//public class SecurityConfig {
//
//    private final JwtAuthenticationFilter jwtAuthenticationFilter;
//    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
//    private final com.smart.Uni.security.BannedUserFilter bannedUserFilter;
//
//    @Value("${app.cors.allowed-origins}")
//    private String allowedOrigins;
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//        http
//                // ✅ CORS
//                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//
//                // ✅ Disable CSRF (for API)
//                .csrf(AbstractHttpConfigurer::disable)
//
//                // ✅ Stateless (JWT)
//                .sessionManagement(session ->
//                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                )
//
//                // ✅ AUTHORIZATION RULES
//                .authorizeHttpRequests(auth -> auth
//
//                        // Public endpoints
//                        .requestMatchers("/api/auth/**").permitAll()
//                        .requestMatchers("/uploads/**").permitAll() // allow images
//
//                        .requestMatchers(HttpMethod.GET, "/api/auth/me").authenticated()
//                        .requestMatchers(HttpMethod.DELETE, "/api/auth/me").authenticated()
//
//                        // ✅ IMPORTANT FIX (allow all resource CRUD for now)
//                        .requestMatchers("/api/resources/**").permitAll()
//
//                        // Role-based endpoints
//                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
//                        .requestMatchers("/api/technician/**").hasAnyRole("ADMIN", "TECHNICIAN")
//
//                        .requestMatchers("/api/bookings/**").authenticated()
//                        // Everything else
//                        .anyRequest().authenticated()
//                )
//
//                // ✅ GOOGLE LOGIN
//                .oauth2Login(oauth2 ->
//                        oauth2.successHandler(oAuth2AuthenticationSuccessHandler)
//                )
//
//                // ✅ JWT FILTER
//                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
//
//                // Fix H2 console issue (optional)
//                .headers(headers -> headers.frameOptions(frame -> frame.disable()));
//
//
//        return http.build();
//    }
//
//    // ✅ CORS CONFIG
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//
//        CorsConfiguration config = new CorsConfiguration();
//
//        config.setAllowedOrigins(List.of(allowedOrigins.split(",")));
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
//        config.setAllowedHeaders(List.of("*"));
//        config.setAllowCredentials(true);
//
//        // IMPORTANT for file upload
//        config.setExposedHeaders(List.of("Authorization"));
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//
//        return source;
//    }
//
//    // ✅ PASSWORD ENCODER
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//}


package com.smart.Uni.config;

import com.smart.Uni.security.BannedUserFilter;
import com.smart.Uni.security.JwtAuthenticationFilter;
import com.smart.Uni.security.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final BannedUserFilter bannedUserFilter;

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // ✅ CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // ✅ Disable CSRF (for API)
                .csrf(AbstractHttpConfigurer::disable)

                // ✅ Stateless (JWT)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // ✅ AUTHORIZATION RULES
                .authorizeHttpRequests(auth -> auth

                        // These MUST come before /api/auth/**
                        .requestMatchers(HttpMethod.GET, "/api/auth/me").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/auth/me").authenticated()

                        // Public endpoints
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/uploads/**").permitAll()

                        // Resource endpoints (your current rule)
                        .requestMatchers("/api/resources/**").permitAll()

                        // Role-based endpoints
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/technician/**").hasAnyRole("ADMIN", "TECHNICIAN")

                        .requestMatchers("/api/bookings/**").authenticated()

                        // Everything else
                        .anyRequest().authenticated()
                )

                // ✅ GOOGLE LOGIN
                .oauth2Login(oauth2 ->
                        oauth2.successHandler(oAuth2AuthenticationSuccessHandler)
                )

                // ✅ JWT filter first
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)

                // ✅ Ban-check filter after JWT (needs authenticated principal)
                .addFilterAfter(bannedUserFilter, JwtAuthenticationFilter.class)

                // Optional for H2 console / frames
                .headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // trim spaces in comma-separated origins
        List<String> origins = Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());

        config.setAllowedOrigins(origins);
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}