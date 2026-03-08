package org.datascience;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.jasypt.iv.RandomIvGenerator;
import org.jasypt.salt.RandomSaltGenerator;

import java.util.Arrays;
import java.util.List;

public class CliTool {

    private static final List<String> SUPPORTED_ALGORITHMS = Arrays.asList(
            "PBEWithMD5AndDES",
            "PBEWithSHA1AndDESede",
            "PBEWithSHA1AndRC2_40",
            "PBEWITHHMACSHA512ANDAES_256");

    private static void printBanner() {
        System.out.println("   ____     _____        _         _____      _                         ____   ");
        System.out.println("  / / /    |  __ \\      | |       / ____|    (_)                        \\ \\ \\  ");
        System.out.println(" / / /_____| |  | | __ _| |_ __ _| (___   ___ _  ___ _ __   ___ ___ _____\\ \\ \\ ");
        System.out.println("< < <______| |  | |/ _` | __/ _` |\\___ \\ / __| |/ _ \\ '_ \\ / __/ _ \\______> > >");
        System.out.println(" \\ \\ \\     | |__| | (_| | || (_| |____) | (__| |  __/ | | | (_|  __/     / / / ");
        System.out.println("  \\_\\_\\    |_____/ \\__,_|\\__\\__,_|_____/ \\___|_|\\___|_| |_|\\___\\___|    /_/_/  ");
        System.out.println();
        System.out.println("DataScience Encryption Tool");
        System.out.println();
    }

    private static void printUsage() {
        System.out.println("Usage:");
        System.out.println("  java -jar ds-encryptor-1.0.0.jar encrypt <text> <algorithm> <secretKey>");
        System.out.println();
        System.out.println("Supported Algorithms:");
        for (String algo : SUPPORTED_ALGORITHMS) {
            if ("PBEWITHHMACSHA512ANDAES_256".equals(algo)) {
                System.out.println("  - " + algo + " (Recommended)");
            } else {
                System.out.println("  - " + algo);
            }
        }
        System.out.println();
        System.out.println("Example:");
        System.out.println(
                "  java -jar ds-encryptor-1.0.0.jar encrypt myPassword123 PBEWITHHMACSHA512ANDAES_256 MySecretKey123!");
        System.out.println();
    }

    private static StandardPBEStringEncryptor createEncryptor(String algorithm, String secretKey) {
        if (!SUPPORTED_ALGORITHMS.contains(algorithm)) {
            throw new IllegalArgumentException("Unsupported algorithm: " + algorithm);
        }

        SimpleStringPBEConfig config = new SimpleStringPBEConfig();
        config.setPassword(secretKey);
        config.setAlgorithm(algorithm);
        config.setKeyObtentionIterations("1000");
        config.setSaltGeneratorClassName(RandomSaltGenerator.class.getName());
        config.setIvGeneratorClassName(RandomIvGenerator.class.getName());
        config.setStringOutputType("base64");

        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setConfig(config);
        return encryptor;
    }

    public static void main(String[] args) {
        printBanner();

        if (args.length != 4) {
            System.out.println("Invalid number of arguments.");
            System.out.println();
            printUsage();
            return;
        }

        String command = args[0].trim().toLowerCase();
        String input = args[1].trim();
        String algorithm = args[2].trim();
        String secretKey = args[3].trim();

        try {
            StandardPBEStringEncryptor encryptor = createEncryptor(algorithm, secretKey);

            if (command.equals("encrypt")) {
                String encrypted = encryptor.encrypt(input);
                System.out.println("Encrypted output:");
                System.out.println(encrypted);
            } else {
                System.out.println("Unknown command: " + command);
                System.out.println();
                printUsage();
            }

        } catch (IllegalArgumentException e) {
            System.out.println("Configuration error: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Processing error: " + e.getMessage());
        }
    }
}
