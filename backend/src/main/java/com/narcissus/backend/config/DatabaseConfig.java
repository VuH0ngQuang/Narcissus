package com.narcissus.backend.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {
    @Bean
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();
        config.setDriverClassName("com.mysql.cj.jdbc.Driver");
        // Verify the JDBC URL is correct
        config.setJdbcUrl("jdbc:mysql://10.1.0.5:3306/Narcissus");
        config.setUsername("narcissus");
        config.setPassword("Narcissus@123");
//        config.setJdbcUrl("jdbc:mysql://localhost:3306/Narcissus");
//        config.setUsername("root");
//        config.setPassword("baby0148");
        config.setMaxLifetime(1800000); // 30 minutes
        config.setKeepaliveTime(30000); // 30 seconds
        config.setConnectionTestQuery("SELECT 1");
        return new HikariDataSource(config);
    }
}