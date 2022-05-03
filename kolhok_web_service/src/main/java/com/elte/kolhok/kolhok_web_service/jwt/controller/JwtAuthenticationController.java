package com.elte.kolhok.kolhok_web_service.jwt.controller;


import com.elte.kolhok.kolhok_web_service.jwt.config.JwtTokenUtil;
import com.elte.kolhok.kolhok_web_service.jwt.model.JwtRequest;
import com.elte.kolhok.kolhok_web_service.jwt.model.JwtResponse;
import com.elte.kolhok.kolhok_web_service.jwt.service.JwtUserDetailsService;
import io.jsonwebtoken.impl.DefaultClaims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

//jwtToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtZXRoIiwiZXhwIjoxNjUxNjIzNjU0LCJpYXQiOjE2NTE2MDU2NTR9.BIdr9YCBalGx1QHBNg8DtP6YYFK80E5Kx41V3z2illABzglg5tja3bWBuLQIdoKAOvrzo-yrKCFZyVTb4fGkYw"
@RestController
@CrossOrigin("http://localhost:4200/")
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @PostMapping("${jwt.get.token.uri}")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch(DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @GetMapping("${jwt.refresh.token.uri}")
    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
        //DefaultClaims claims = (io.jsonwebtoken.impl.DefaultClaims) request.getAttribute("claims");
        //Map<String, Object> expectedMap = getMapFromIoJsonwebtokenClaims(claims);
        String username = jwtTokenUtil.getUsernameFromToken(request.getHeader("Authorization").substring(7));
        String token = jwtTokenUtil.doGenerateRefreshToken(new HashMap<String, Object>(), username);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    public Map<String, Object> getMapFromIoJsonwebtokenClaims(DefaultClaims claims) {
        Map<String, Object> expectedMap = new HashMap<String, Object>();
        for (Map.Entry<String, Object> entry : claims.entrySet()) {
            expectedMap.put(entry.getKey(), entry.getValue());
        }
        return expectedMap;
    }
}
