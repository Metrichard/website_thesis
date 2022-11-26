package com.elte.kolhok.controller;

import com.elte.kolhok.model.Person;
import com.elte.kolhok.repository.PeopleRepository;
import com.elte.kolhok.resource.PersonRequest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@EntityScan("com.elte.kolhok")
@CrossOrigin("*")
public class PeopleController {

    private final PeopleRepository peopleRepository;

    public PeopleController(PeopleRepository peopleRepository) {
        this.peopleRepository = peopleRepository;
    }

    @GetMapping("/api/people")
    public ResponseEntity<?> getAllPeople() {
        return ResponseEntity.ok(peopleRepository.findAll());
    }

    @GetMapping("/api/person/{id}")
    public ResponseEntity<?> getPerson(@PathVariable String id){
        return ResponseEntity.ok(peopleRepository.findById(id));
    }

    @PostMapping("/api/person-create")
    public ResponseEntity<?> createPerson(@RequestBody PersonRequest personRequest) {
        Person person = new Person(personRequest.getName(), personRequest.getTitle(), personRequest.getEmails(), personRequest.getFileName());

        return ResponseEntity.status(201).body(peopleRepository.save(person));
    }

    @PostMapping("/api/person-update")
    public ResponseEntity<?> updatePerson(@RequestBody PersonRequest personRequest) {
        Optional<Person> person = peopleRepository.findById(personRequest.getId());
        if(person.isPresent()) {
            peopleRepository.deleteById(person.get().getId());
            Person current = person.get();
            current.setName(personRequest.getName());
            current.setTitle(personRequest.getTitle());
            current.setEmails(personRequest.getEmails());
            current.setFileName(personRequest.getFileName());
            return ResponseEntity.ok(peopleRepository.save(current));
        }
        return ResponseEntity.status(401).body("Could no update person with id {" + personRequest.getId() + "} because it does not exist.");
    }

    @DeleteMapping("/api/person-delete/{id}")
    public ResponseEntity<?> deletePerson(@PathVariable String id) {
        Optional<Person> person = peopleRepository.findById(id);

        if (person.isPresent()) {
            peopleRepository.deleteById(id);
        }

        return ResponseEntity.ok("Person deleted successfully.");
    }
}
