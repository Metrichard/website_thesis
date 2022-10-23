package com.elte.kolhok.controller;


import com.elte.kolhok.repository.DormRepository;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EntityScan("com.elte.kolhok")
@CrossOrigin("*")
public class DormController {

    private final DormRepository dormRepository;

    public DormController(DormRepository dormRepository) {
        this.dormRepository = dormRepository;
    }


    @GetMapping("api/dorms")
    public ResponseEntity<?> getAllDorms() {
        var response =ResponseEntity.ok(dormRepository.findAll());
        var responseBody = response.getBody();
        return response;
    }
}
