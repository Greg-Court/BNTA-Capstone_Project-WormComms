package com.bnta.wormcomms.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.nio.file.attribute.PosixFilePermissions;
import java.util.HashSet;
import java.util.Set;


@Service
public class FileStorageService {

    private final String fileUploadPath;

    @Autowired
    public FileStorageService(@Value("${file.upload.path}") String fileUploadPath) {
        this.fileUploadPath = fileUploadPath;
    }

    public void createDirectory(String directoryName) throws IOException {
        Set<PosixFilePermission> perms = new HashSet<>();
        perms.add(PosixFilePermission.OWNER_READ);
        perms.add(PosixFilePermission.OWNER_WRITE);
        perms.add(PosixFilePermission.OWNER_EXECUTE);
        perms.add(PosixFilePermission.GROUP_READ);
        perms.add(PosixFilePermission.GROUP_EXECUTE);
        perms.add(PosixFilePermission.OTHERS_READ);
        perms.add(PosixFilePermission.OTHERS_EXECUTE);

        Path path = Paths.get(fileUploadPath, directoryName);
        Files.createDirectories(path, PosixFilePermissions.asFileAttribute(perms));
    }

    public String getFileUploadPath() {
        return fileUploadPath;
    }
}
