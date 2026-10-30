
package com.trailrun.project.Service;

import com.trailrun.project.Model.Product;
import com.trailrun.project.Repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@Service
public class ProductService {
    @Autowired
    private ProductRepo repo;

    public ProductService() {
    }

    public List<Product> getAllProducts() {

        return this.repo.findAll();
    }

    public Product getProduct(int id) {

        return (Product)this.repo.findById(id).orElse((Product) null);
    }

    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());
        return (Product)this.repo.save(product);
    }


    public Product updateProduct(int id, Product product, MultipartFile imageFile) throws IOException{
        product.setImageData(imageFile.getBytes());
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        return repo.save(product);

    }

    public void deleteProduct(int id) {
        repo.deleteById(id);
    }

    public List<Product> searchProducts(String keyword){
        return repo.searchProducts(keyword);

    }
}
