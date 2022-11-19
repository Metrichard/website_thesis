package com.elte.kolhok.controller;

import com.elte.kolhok.model.FilterData;
import com.elte.kolhok.repository.FilterDataRepository;
import com.elte.kolhok.resource.FilterDataRequest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@EntityScan("com.elte.kolhok")
@CrossOrigin("*")
public class FilterDataController {

    private final FilterDataRepository filterDataRepository;

    public FilterDataController(FilterDataRepository filterDataRepository) {
        this.filterDataRepository = filterDataRepository;
    }

    @GetMapping("/api/filter-get/{name}")
    public ResponseEntity<?> getFilterForPage(@PathVariable String name) {
        return ResponseEntity.ok(filterDataRepository.findAll().stream().filter(p -> p.getPageName().equals(name)).findFirst());
    }

    @PostMapping("/api/filter-create")
    public ResponseEntity<?> createFilterForPage(@RequestBody FilterDataRequest filterDataRequest) {
        FilterData filterData = new FilterData(filterDataRequest.getPageName(), filterDataRequest.getTag());
        return ResponseEntity.ok(filterDataRepository.save(filterData));
    }

    @PostMapping("/api/filter-update")
    public ResponseEntity<?> updateFilterForPage(@RequestBody FilterDataRequest filterDataRequest) {
        Optional<FilterData> filterData = filterDataRepository.findById(filterDataRequest.getId());
        if (filterData.isPresent()) {
            filterDataRepository.deleteById(filterDataRequest.getId());
            FilterData current = filterData.get();
            current.setPageName(filterDataRequest.getPageName());
            current.setTag(filterDataRequest.getTag());
            return ResponseEntity.status(201).body(filterDataRepository.save(current));
        }

        return ResponseEntity.status(400).body("Could not update filter with {" + filterDataRequest.getId() + "} because it does not exit.");
    }
}
