# DataScience Encryptor

## Overview
This is a CLI encryption tool built with Java and Jasypt. It provides a secure, easy-to-use command line interface for encrypting text using various algorithms including modern AES-256.

## Architecture
The system intentionally separates responsibilities:
The decryptor exists in a separate private repository for security reasons.
This repository must only contain encryption functionality.

## Features
• CLI based encryption
• Multiple algorithms
• Modern AES-256 encryption
• Random Salt generation
• Random IV generation
• Base64 encrypted output

## Requirements
- Java 21
- Maven

## Build Instructions
```bash
mvn clean package
```

## Running the Tool
Example:
```bash
java -jar target/ds-encryptor-1.0.0.jar encrypt hello PBEWITHHMACSHA512ANDAES_256 MySecretKey123
```

### Example Output
```
Encrypted output:
XJ9sYsiRIJIT...
```

## Supported Algorithms
* PBEWithMD5AndDES
* PBEWithSHA1AndDESede
* PBEWithSHA1AndRC2_40
* **PBEWITHHMACSHA512ANDAES_256 (Recommended)**

## Security Note
• The decryptor is distributed separately.
• Private keys must never be stored in this repository.

## Project Structure
```text
src/main/java
pom.xml
```

## License
MIT
