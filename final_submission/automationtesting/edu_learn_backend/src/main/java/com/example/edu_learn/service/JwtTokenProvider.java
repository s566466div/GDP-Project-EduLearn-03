package com.example.edu_learn.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.example.edu_learn.entity.User;

import java.util.Date;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Base64;

@Service
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    private String secretKey;

    private final long validityInMilliseconds = 3600000; // 1 hour

    public String generateToken(UserDetails userDetails, String userRole, String id) {
        // Claims claims = Jwts.claims().setSubject(userDetails.getUsername());
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", userRole);
        claims.put("id", id);

        // System.out.println(generateKey());
        // String token = Jwts.builder()
        // .claims(claims)
        // .subject(userDetails.getUsername())
        // .issuedAt(now)
        // .expiration(validity)
        // .signWith(generateKey())
        // .compact();
        // System.out.println(token);
        return Jwts.builder()
                    .claims(claims)
                    .subject(userDetails.getUsername())
                    .issuedAt(now)
                    .expiration(validity)
                    .signWith(generateKey())
                    .compact();
    }

    private SecretKey generateKey() {
        System.out.println(secretKey);
        byte[] decodedKey = Base64.getDecoder().decode(secretKey);
        return Keys.hmacShaKeyFor(decodedKey);
    }

    public Claims getClaims(String jwt) {
        return Jwts 
                .parser()
                .verifyWith(generateKey())
                .build()
                .parseSignedClaims(jwt)
                .getPayload();
    }

    public String getEmailFromToken(String jwt) {
        Claims claims = getClaims(jwt);
        return claims.getSubject();
    }

    public String getRoleFromToken(String jwt) {
        Claims claims = getClaims(jwt);
        return claims.get("role", String.class);
    }

    public String getIdFromToken(String jwt) {
        Claims claims = getClaims(jwt);
        return claims.get("id", String.class);
    }

    public boolean validateToken(String jwt) {
        Claims claims = getClaims(jwt);
        return claims.getExpiration().after(Date.from(Instant.now()));
    }
}

// @Service
// public class JwtTokenProvider {
//     @Value("${jwt.secret}")
//     private String secretKey;

//     @Value("${jwt.expiration}")
//     private long jwtExpiration;

//     public String extractUsername(String token) {
//         return extractClaim(token, Claims::getSubject);
//     }

//     public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//         final Claims claims = extractAllClaims(token);
//         return claimsResolver.apply(claims);
//     }

//     public String generateToken(UserDetails userDetails) {
//         return generateToken(new HashMap<>(), userDetails);
//     }

//     public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
//         return buildToken(extraClaims, userDetails, jwtExpiration);
//     }

//     public long getExpirationTime() {
//         return jwtExpiration;
//     }

//     private String buildToken(
//             Map<String, Object> extraClaims,
//             UserDetails userDetails,
//             long expiration
//     ) {
//         return Jwts
//                 .builder()
//                 .setClaims(extraClaims)
//                 .setSubject(userDetails.getUsername())
//                 .setIssuedAt(new Date(System.currentTimeMillis()))
//                 .setExpiration(new Date(System.currentTimeMillis() + expiration))
//                 .signWith(getSignInKey(), SignatureAlgorithm.HS256)
//                 .compact();
//     }

//     public boolean isTokenValid(String token, UserDetails userDetails) {
//         final String username = extractUsername(token);
//         return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
//     }

//     private boolean isTokenExpired(String token) {
//         return extractExpiration(token).before(new Date());
//     }

//     private Date extractExpiration(String token) {
//         return extractClaim(token, Claims::getExpiration);
//     }

//     private Claims extractAllClaims(String token) {
//         return Jwts
//                 .parserBuilder()
//                 .setSigningKey(getSignInKey())
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();
//     }

//     private Key getSignInKey() {
//         byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//         return Keys.hmacShaKeyFor(keyBytes);
//     }
// }

// @Component
// public class JwtTokenProvider {

//     @Value("${jwt.secret}")
//     private String secretKey;

//     private final long validityInMilliseconds = 3600000; // 1 hour

//     public String createToken(String email, User.Role role) {
//         Claims claims = Jwts.claims().setSubject(email);
//         claims.put("role", role);

//         Date now = new Date();
//         Date validity = new Date(now.getTime() + validityInMilliseconds);

//         String token = Jwts.builder()
//                 .setClaims(claims)
//                 .setIssuedAt(now)
//                 .setExpiration(validity)
//                 .signWith(SignatureAlgorithm.HS256, secretKey)
//                 .compact();
//         return Base64Codec.BASE64.encode(token.getBytes());
//     }

//     public String getEmailFromToken(String token) {
//         return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
//     }

//     public boolean validateToken(String token) {
//         try {
//             Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
//             return true;
//         } catch (Exception e) {
//             return false;
//         }
//     }
// }
