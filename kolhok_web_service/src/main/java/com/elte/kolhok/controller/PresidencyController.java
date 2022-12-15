package com.elte.kolhok.controller;

import com.elte.kolhok.model.PersPerson;
import com.elte.kolhok.repository.PresidencyRepository;
import com.elte.kolhok.resource.PersonRequest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@EntityScan("com.elte.kolhok")
@CrossOrigin("*")
public class PresidencyController {

    private final PresidencyRepository presidencyRepository;

    public PresidencyController(PresidencyRepository presidencyRepository) {
        this.presidencyRepository = presidencyRepository;
    }

    @GetMapping("/api/pres-people")
    public ResponseEntity<?> getAllPeople() {
        return ResponseEntity.ok(presidencyRepository.findAll());
    }

    @GetMapping("/api/pres-person/{id}")
    public ResponseEntity<?> getPerson(@PathVariable String id){
        return ResponseEntity.ok(presidencyRepository.findById(id));
    }

    @PostMapping("/api/pres-person-create")
    public ResponseEntity<?> createPerson(@RequestBody PersonRequest personRequest) {
        PersPerson person = new PersPerson(personRequest.getName(), personRequest.getTitle(), personRequest.getEmails(), personRequest.getFileName());

        return ResponseEntity.status(201).body(presidencyRepository.save(person));
    }

    @PatchMapping("/api/pres-person-update")
    public ResponseEntity<?> updatePerson(@RequestBody PersonRequest personRequest) {
        Optional<PersPerson> person = presidencyRepository.findById(personRequest.getId());
        if(person.isPresent()) {
            presidencyRepository.deleteById(person.get().getId());
            PersPerson current = person.get();
            current.setName(personRequest.getName());
            current.setTitle(personRequest.getTitle());
            current.setEmails(personRequest.getEmails());
            return ResponseEntity.ok(presidencyRepository.save(current));
        }
        return ResponseEntity.status(401).body("Could no update person with id {" + personRequest.getId() + "} because it does not exist.");
    }

    @DeleteMapping("/api/pres-person-delete/{id}")
    public ResponseEntity<?> deletePerson(@PathVariable String id) {
        Optional<PersPerson> person = presidencyRepository.findById(id);

        if (person.isPresent()) {
            presidencyRepository.deleteById(id);
        }

        return ResponseEntity.ok("Person deleted successfully.");
    }
}
