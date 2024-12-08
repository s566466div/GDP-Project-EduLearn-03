package com.example.edu_learn_backend.entity;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

// import javax.persistence.*;

// import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"enrolledCourses", "createdCourses"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;


    @ManyToMany
    @JoinTable(
        name = "course_enrollments",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    @JsonIgnore
    private Set<Course> enrolledCourses;

    @OneToMany(mappedBy = "instructor")
    @JsonIgnore
    private Set<Course> createdCourses;

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return email;
    }

    // public void setUsername(String username) {
    //     this.username = username;
    // }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role.toString();
    }

    // public Set<Course> getEnrolledCourses() {
    //     return enrolledCourses;
    // }


}
