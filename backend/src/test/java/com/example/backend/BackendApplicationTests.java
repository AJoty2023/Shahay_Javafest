package com.example.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")  // Use test profile
class BackendApplicationTests {

    @Test
    void contextLoads() {
        // This test just verifies that the Spring context loads successfully
    }
}