package com.miyo.products;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

@ExtendWith(MockitoExtension.class)
class ProductControllerTest {

    @Mock
    private ProductRepository productRepository;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = standaloneSetup(new ProductController(productRepository)).build();
    }

    @Test
    void getProductsReturnsProducts() throws Exception {
        when(productRepository.findAll()).thenReturn(List.of(
                product(1, "Keyboard"),
                product(2, "Mouse")
        ));

        mockMvc.perform(get("/products"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                          {"id": 1, "name": "Keyboard"},
                          {"id": 2, "name": "Mouse"}
                        ]
                        """));

        verify(productRepository).findAll();
    }

    @Test
    void createProductSavesAndReturnsProduct() throws Exception {
        Product savedProduct = product(1, "Keyboard");
        when(productRepository.save(any(Product.class))).thenReturn(savedProduct);

        mockMvc.perform(post("/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name": "Keyboard"}
                                """))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {"id": 1, "name": "Keyboard"}
                        """));

        ArgumentCaptor<Product> productCaptor = ArgumentCaptor.forClass(Product.class);
        verify(productRepository).save(productCaptor.capture());
        assertThat(productCaptor.getValue().getName()).isEqualTo("Keyboard");
    }

    private Product product(int id, String name) {
        Product product = new Product(name);
        product.setId(id);
        return product;
    }
}
