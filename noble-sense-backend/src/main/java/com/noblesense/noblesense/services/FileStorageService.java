package com.noblesense.noblesense.services;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {

//    private AmazonS3 amazonS3;
//    @Autowired
//    public FileStorageService(AmazonS3 amazonS3) {
//        this.amazonS3 = amazonS3;
//    }
//
//    @Value("${aws.s3.bucketName}")
//    private String bucketName;
//
//    public String uploadFile(String fileName, MultipartFile multipartFile) throws IOException {
//        // Convert MultipartFile to InputStream
//        try (InputStream inputStream = multipartFile.getInputStream()) {
//            // Create an ObjectMetadata instance and set the content length
//            ObjectMetadata metadata = new ObjectMetadata();
//            metadata.setContentLength(multipartFile.getSize());
//            metadata.setContentType(multipartFile.getContentType());
//
//            // Create a PutObjectRequest to upload the file
//            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName, inputStream, metadata);
//
//            // Upload file to S3
//            amazonS3.putObject(putObjectRequest);
//
//            // Return the file URL
//            return "https://" + bucketName + ".s3.amazonaws.com/" + fileName;
//        }
//    }
//
//    public void deleteFile(String fileName) {
//        String key = fileName.substring(fileName.lastIndexOf("/") + 1);
//        amazonS3.deleteObject(new DeleteObjectRequest(bucketName, key));
//    }
//
//    public S3Object getFile(String fileName) {
//        return amazonS3.getObject(bucketName, fileName);
//    }
//    public Resource getFileAsResource(String fileName) throws IOException {
//        S3Object s3Object = amazonS3.getObject(bucketName, fileName);
//        S3ObjectInputStream inputStream = s3Object.getObjectContent();
//        return new InputStreamResource(inputStream);
//    }

    @Value("${file.upload.directory}")
    private String storagePath;
    @Value("${server.port}")
    private String port;

    public String uploadFile(String originalFileName, MultipartFile multipartFile) throws IOException {
        File dir = new File(storagePath);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // Generate unique file name
        String fileExtension = "";
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex > 0) {
            fileExtension = originalFileName.substring(dotIndex);
        }

        String newFileName = UUID.randomUUID().toString() + fileExtension;
        Path filePath = Path.of(storagePath, newFileName);

        Files.copy(multipartFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return "http://localhost:"+ port+ "/" +newFileName; // Return only the file name
    }


    public void deleteFile(String fileName) {
        System.out.println("Deleting file: " + fileName);
        File file = new File(storagePath, fileName);
        if (file.exists()) {
            file.delete();
        }
    }

    public Resource getFileAsResource(String fileName) {
        File file = new File(storagePath, fileName);
        return file.exists() ? new FileSystemResource(file) : null;
    }
}