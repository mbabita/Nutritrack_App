package com.nutritrack.service;

import com.nutritrack.model.User;
import com.nutritrack.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUsers() {
        User user1 = new User("John Doe", "john@example.com", 30, "Male", 75.0, 175.0, LocalDate.of(1993, 5, 15));
        User user2 = new User("Jane Smith", "jane@example.com", 25, "Female", 60.0, 165.0, LocalDate.of(1998, 8, 20));
        List<User> users = Arrays.asList(user1, user2);

        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.getAllUsers();

        assertEquals(2, result.size());
        assertEquals("John Doe", result.get(0).getName());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testGetUserById() {
        User user = new User("John Doe", "john@example.com", 30, "Male", 75.0, 175.0, LocalDate.of(1993, 5, 15));
        user.setId(1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        Optional<User> result = userService.getUserById(1L);

        assertTrue(result.isPresent());
        assertEquals("John Doe", result.get().getName());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void testCreateUser() {
        User user = new User("John Doe", "john@example.com", 30, "Male", 75.0, 175.0, LocalDate.of(1993, 5, 15));

        when(userRepository.save(user)).thenReturn(user);

        User result = userService.createUser(user);

        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testUpdateUser() {
        User existingUser = new User("John Doe", "john@example.com", 30, "Male", 75.0, 175.0, LocalDate.of(1993, 5, 15));
        existingUser.setId(1L);
        User updatedUser = new User("John Updated", "john@example.com", 31, "Male", 76.0, 175.0, LocalDate.of(1993, 5, 15));

        when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);

        User result = userService.updateUser(1L, updatedUser);

        assertNotNull(result);
        assertEquals("John Updated", result.getName());
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testUpdateUserNotFound() {
        User updatedUser = new User("John Updated", "john@example.com", 31, "Male", 76.0, 175.0, LocalDate.of(1993, 5, 15));

        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        User result = userService.updateUser(1L, updatedUser);

        assertNull(result);
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testDeleteUser() {
        userService.deleteUser(1L);

        verify(userRepository, times(1)).deleteById(1L);
    }
}
