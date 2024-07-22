package departamento.unal.dep.Controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/upload")
public class imagePruebaController {

    private final String uploadDir = "uploads/";
    private final Path uploadPath = Paths.get(uploadDir);

    @PostMapping("/image")
    public String cargarImagen(@RequestParam("file") MultipartFile file) {
        try {
            // Create directory if it doesn't exist
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Generate a unique and short identifier
            String uniqueId = generateShortUniqueId();

            // Get the original file name and extension
            String originalFileName = file.getOriginalFilename();
            String extension = "";
            if (originalFileName != null && originalFileName.contains(".")) {
                extension = originalFileName.substring(originalFileName.lastIndexOf("."));
                originalFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
            }

            // Combine the original file name, unique identifier, and extension
            String fileName = originalFileName + "_" + uniqueId + extension;
            Path filePath = uploadPath.resolve(fileName);

            // Save the file
            Files.copy(file.getInputStream(), filePath);

            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return "File upload failed: " + e.getMessage();
        }
    }

    @GetMapping("/image/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        try {
            Path filePath = uploadPath.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                String contentType = Files.probeContentType(filePath);

                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .body(resource);
            } else {
                return ResponseEntity.status(404).body(null);
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(null);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/image/{fileName}")
    public ResponseEntity<String> deleteImage(@PathVariable String fileName) {
        try {
            Path filePath = uploadPath.resolve(fileName).normalize();
            File file = filePath.toFile();

            if (file.exists() && file.isFile()) {
                if (file.delete()) {
                    return ResponseEntity.ok("File deleted successfully: " + fileName);
                } else {
                    return ResponseEntity.status(500).body("File deletion failed.");
                }
            } else {
                return ResponseEntity.status(404).body("File not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error occurred while deleting the file.");
        }
    }

    private String generateShortUniqueId() {
        // Generate a UUID and take the first 8 characters
        return UUID.randomUUID().toString().substring(0, 8);
    }
}
