package com.example.edu_learn.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.example.edu_learn.entity.User;
import com.example.edu_learn.security.JwtTokenFilter;
import com.example.edu_learn.service.CustomUserDetailsService;
import com.mysql.cj.x.protobuf.MysqlxCrud.Collection;

import io.jsonwebtoken.lang.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    @Order(SecurityProperties.DEFAULT_FILTER_ORDER)
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
        // .cors(cors -> cors.configurationSource(request -> {
        //     CorsConfiguration config = new CorsConfiguration();
        //     config.setAllowedOrigins(["http://localhost:3000"]);; // React app URL
        //     config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        //     config.setAllowedHeaders(Arrays.asList("*"));
        //     return config;
        // }))
        .authorizeHttpRequests(requests -> {
            requests.anyRequest().permitAll();
            // requests.
        }).csrf(csrf -> csrf.disable()).build();
    }

    // @SuppressWarnings("removal")
    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //     /**System.err.println("whats up");
    //     http.authorizeHttpRequests(requests -> requests
    //             .requestMatchers("/api/auth/**").permitAll()
    //             .anyRequest().authenticated()
    //             // .and()
    //             // .addFilterAfter(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class)
    //             );
    //             // .formLogin(form -> form.loginPage("/login").permitAll())
    //             // .logout(logout -> logout.permitAll());
    //     return http.build();**/
    //     return http.authorizeHttpRequests(requests -> {
    //         // requests.requestMatchers("/").permitAll();
    //         requests.anyRequest().permitAll();
    //     }).build();
        
    // }
    // pr void configure(HttpSecurity http) throws Exception {
    //     http.csrf().disable()
    //         .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    //         .and()
    //         .authorizeRequests()
    //         .requestMatchers("/api/auth/**").permitAll()
    //         .anyRequest().authenticated()
    //         .and()
    //         .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    // }

    // @Bean 
    // public UserDetailsService userDetailsService() {
    //     return customUserDetailsService;
    // }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // @Bean
    // public JwtTokenFilter jwtTokenFilter() {
    //     return new JwtTokenFilter();
    // }
}