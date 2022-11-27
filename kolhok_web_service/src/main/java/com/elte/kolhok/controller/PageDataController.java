package com.elte.kolhok.controller;

import com.elte.kolhok.model.PageData;
import com.elte.kolhok.repository.PageDataRepository;
import com.elte.kolhok.resource.PageDataRequest;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@EntityScan("com.elte.kolhok")
@CrossOrigin("*")
public class PageDataController {

    private final PageDataRepository pageDataRepository;

    public PageDataController(PageDataRepository pageDataRepository) {
        this.pageDataRepository = pageDataRepository;
    }

    @GetMapping("/api/page-data-get/{pageName}")
    public ResponseEntity<?> getPageDataByName(@PathVariable String pageName) {
        List<PageData> pageDataList = pageDataRepository.findAll();
        if(pageDataList.size() > 0) {
            for (PageData data : pageDataList) {
                if(data.getPageName().equals(pageName)) {
                    return ResponseEntity.ok(data);
                }
            }
        }
        return ResponseEntity.status(404).body("Could no find page with name {" + pageName + "} because it does not exist.");
    }

    @PostMapping("/api/page-data-create")
    public ResponseEntity<?> createPageData(@RequestBody PageDataRequest pageDataRequest) {
        PageData pageData = new PageData(pageDataRequest.getPageName(), pageDataRequest.getMessageTitle(), pageDataRequest.getMessage(), pageDataRequest.getFileNames());

        return ResponseEntity.ok(pageDataRepository.save(pageData));
    }

    @PostMapping("/api/page-data-update")
    public ResponseEntity<?> updatePageData(@RequestBody PageDataRequest pageDataRequest) {
        Optional<PageData> pageData = pageDataRepository.findById(pageDataRequest.getId());

        if(pageData.isPresent()) {
            pageDataRepository.deleteById(pageDataRequest.getId());
            PageData current = pageData.get();
            current.setPageName(pageDataRequest.getPageName());
            current.setMessageTitle(pageDataRequest.getMessageTitle());
            current.setMessage(pageDataRequest.getMessage());
            current.setFileNames(pageDataRequest.getFileNames());
            return ResponseEntity.ok(pageDataRepository.save(current));
        }

        return ResponseEntity.status(400).body("Could no find page data with id {" + pageDataRequest.getId() + "}. It does not exits. It can not be updated");
    }

    @DeleteMapping("/api/page-data-delete/{id}")
    public ResponseEntity<?> deletePageData(@PathVariable String id) {
        Optional<PageData> pageData = pageDataRepository.findById(id);

        if (pageData.isPresent()) {
            pageDataRepository.deleteById(id);
        }

        return ResponseEntity.ok("Deletion successful.");
    }
}
