package com.elte.kolhok.controller;

import com.elte.kolhok.model.DateEvent;
import com.elte.kolhok.repository.DateEventRepository;
import com.elte.kolhok.resource.DateEventRequest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@EntityScan("com.elte.kolhok")
@CrossOrigin("*")
public class DateEventController {

    private final DateEventRepository dateEventRepository;

    public DateEventController(DateEventRepository dateEventRepository) {
        this.dateEventRepository = dateEventRepository;
    }

    @GetMapping("api/calendar-get-all")
    public ResponseEntity<?> getAllDateEvents() {
        return ResponseEntity.ok(dateEventRepository.findAll());
    }

    @PostMapping("api/calendar-create")
    public ResponseEntity<?> createDateEvent(@RequestBody DateEventRequest dateEventRequest) {
        DateEvent dateEvent = new DateEvent(dateEventRequest.getTitle(), dateEventRequest.getDate(), dateEventRequest.getColor());

        return ResponseEntity.status(201).body(dateEventRepository.save(dateEvent));
    }

    @PostMapping("api/calendar-update")
    public ResponseEntity<?> updateDateEvent(@RequestBody DateEventRequest dateEventRequest){
        Optional<DateEvent> dateEvent = dateEventRepository.findById(dateEventRequest.getId());

        if(dateEvent.isPresent()) {
            dateEventRepository.deleteById(dateEvent.get().getId());
            DateEvent current = dateEvent.get();
            current.setTitle(dateEventRequest.getTitle());
            current.setDate(dateEventRequest.getDate());
            current.setColor(dateEventRequest.getColor());
            return ResponseEntity.ok(dateEventRepository.save(current));
        }

        return ResponseEntity.status(400).body("DateEvent with id {" + dateEvent.get().getId() + "} can not be updated because it does not exist.");
    }

    @DeleteMapping("api/calendar-delete/{id}")
    public ResponseEntity<?> deleteDateEvent(@PathVariable String id) {
        Optional<DateEvent> dateEvent = dateEventRepository.findById(id);

        if(dateEvent.isPresent()) {
            dateEventRepository.deleteById(id);
        }

        return ResponseEntity.ok(204);
    }
}
