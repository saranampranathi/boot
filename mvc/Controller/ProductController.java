
package com.trailrun.project.Controller;

import com.trailrun.project.Model.Product;
import com.trailrun.project.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping({"/api"})
@CrossOrigin
public class ProductController {
    @Autowired
    private ProductService service;

    public ProductController() {
    }

    @GetMapping({"/products"})
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity(this.service.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping({"/product/{id}"})
    public ResponseEntity getProduct(@PathVariable int id) {
        Product product = this.service.getProduct(id);
        return product != null ? new ResponseEntity(product, HttpStatus.OK) : new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PostMapping({"/product"})
    public ResponseEntity<?> addProduct(@RequestPart Product product, @RequestPart MultipartFile imageFile) {
        try {
            Product product1 = this.service.addProduct(product, imageFile);
            return new ResponseEntity<>(product1, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/product/{productId}/image")
    // image fetching
    public  ResponseEntity<byte[]> getImageByProductId(@PathVariable int productId){
        Product product=service.getProduct(productId);
        byte[] image=product.getImageData();
        return ResponseEntity.ok().contentType(MediaType.valueOf(product.getImageType())).body(image);
    }


    @PutMapping("/product/{id}")
    public ResponseEntity<String>  updateProduct(@PathVariable int id,@RequestPart Product product,
                                                 @RequestPart MultipartFile imageFile){
        Product prod1= null;
        try {
            prod1 = service.updateProduct(id,product,imageFile);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed",HttpStatus.BAD_REQUEST);
        }
        if(prod1!=null){
           return new ResponseEntity<>("update",HttpStatus.OK);
       }
       else{
           return new ResponseEntity<>("Failed",HttpStatus.BAD_REQUEST);
       }

    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id){
        Product product=service.getProduct(id);
        if(product!=null){
            service.deleteProduct(id);
            return new ResponseEntity<>("Deleted",HttpStatus.OK);
        }
        else{
            return  new ResponseEntity<>("Not found",HttpStatus.NOT_FOUND);
        }
    }


    @RequestMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String Keyword){
        List<Product> products=service.searchProducts(Keyword);

        return new ResponseEntity<>(products,HttpStatus.OK);
    }
}