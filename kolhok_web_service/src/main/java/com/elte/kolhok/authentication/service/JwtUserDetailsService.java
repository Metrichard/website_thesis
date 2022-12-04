package com.elte.kolhok.authentication.service;

import com.elte.kolhok.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public JwtUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<com.elte.kolhok.model.User> users =  userRepository.findAll().stream().toList();

        for (com.elte.kolhok.model.User user: users) {
            if(user.getUsername().equals(username)) {
                return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
            }
        }

        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}
