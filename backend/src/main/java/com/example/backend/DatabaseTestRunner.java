package com.example.backend;

import com.example.backend.model.TestEntity;
import com.example.backend.repository.TestRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseTestRunner implements CommandLineRunner {

    private final TestRepository repository;

    public DatabaseTestRunner(TestRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        TestEntity entity = new TestEntity();
        entity.setName("Hello MySQL");
        repository.save(entity);
        System.out.println("✅ Saved test entity to DB!");
    }
}
