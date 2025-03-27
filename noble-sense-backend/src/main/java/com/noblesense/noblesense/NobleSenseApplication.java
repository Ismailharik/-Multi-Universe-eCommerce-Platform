package com.noblesense.noblesense;


import com.noblesense.noblesense.dto.RegisterRequest;
import com.noblesense.noblesense.services.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import static com.noblesense.noblesense.enums.Role.ADMIN;


@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class NobleSenseApplication {

    public static void main(String[] args) {
        SpringApplication.run(NobleSenseApplication.class, args);
    }
    // uncomment this bean only on the first time to insert admin
//        @Bean
        public CommandLineRunner commandLineRunner(
                AuthenticationService service
        ) {
            return args -> {
                var admin = RegisterRequest.builder()
                        .fullName("Admin")
                        .phone("1111")
                        .password("1234")
                        .active(true) // make sure its active because when Its not active he can't authenticate
                        .role(ADMIN)
                        .build();
                System.out.println("Admin token: " + service.register(admin).getAccessToken());
            };
        }


}
