package com.elte.kolhok.controller;


import com.elte.kolhok.model.Dorm;
import com.elte.kolhok.repository.DormRepository;
import com.elte.kolhok.resource.DormRequest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @PostMapping("/api/dorm-create")
    public ResponseEntity<?> createDorm(@RequestBody DormRequest dormRequest) {
        Dorm dorm = new Dorm(dormRequest.getDormName(), dormRequest.getDormAddress(), dormRequest.getDormPrincipal(), dormRequest.getDormPrincipalEmailAddress());

        return ResponseEntity.status(201).body(dormRepository.save(dorm));
    }

    @PostMapping("/api/dorm-update")
    public ResponseEntity<?> updateDorm(@RequestBody DormRequest dormRequest) {
        Optional<Dorm> dorm = dormRepository.findById(dormRequest.getId());

        if(dorm.isPresent()) {
            dormRepository.deleteById(dorm.get().getId());
            Dorm current = dorm.get();
            current.setDormName(dormRequest.getDormName());
            current.setDormAddress(dormRequest.getDormAddress());
            current.setDormPrincipal(dormRequest.getDormPrincipal());
            current.setDormPrincipalEmailAddress(dormRequest.getDormPrincipalEmailAddress());
            return ResponseEntity.ok(dormRepository.save(current));
        }

        return ResponseEntity.status(400).body("Dorm with id {" + dorm.get().getId() + "} can not be updated because it does not exist.");
    }

    @DeleteMapping("api/dorm-delete/{id}")
    public ResponseEntity<?> deleteDorm(@PathVariable String id) {
        Optional<Dorm> dorm = dormRepository.findById(id);

        if(dorm.isPresent()) {
            dormRepository.deleteById(id);
        }
        return ResponseEntity.ok(204);
    }
}
