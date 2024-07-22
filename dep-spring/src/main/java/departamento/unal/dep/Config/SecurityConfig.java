package departamento.unal.dep.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import departamento.unal.dep.jwt.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf
                        .disable())
                .authorizeHttpRequests(authRequest -> authRequest
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register").authenticated()
                        .requestMatchers(HttpMethod.POST, "/auth/change-password").authenticated()
                        .requestMatchers(HttpMethod.POST, "/auth/change-role").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/docentes/noAuth/**").permitAll() 
                        .requestMatchers(HttpMethod.GET, "/api/modeloPermisos/noAuth/**").permitAll() 
                        .requestMatchers(HttpMethod.GET, "/api/NoticiasEventos/noAuth/**").permitAll() 
                        .requestMatchers(HttpMethod.GET, "/api/permisos/noAuth/**").permitAll() 
                        .requestMatchers(HttpMethod.GET, "/api/enlacesInteres/noAuth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/investigacion/noAuth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/programa/noAuth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/materialDidactico/noAuth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/upload/**").permitAll()
                        .requestMatchers("/user/docente").authenticated()
                        .requestMatchers("/user/dir/**").hasAuthority("DIR")
                        .anyRequest().authenticated())
                .sessionManagement(sessionManager -> sessionManager
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();

    }

}