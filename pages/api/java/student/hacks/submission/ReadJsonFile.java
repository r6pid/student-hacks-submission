package student.hacks.submission;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ReadJsonFile {
    public static String readJsonFromFile(String filePath) throws IOException {
        StringBuilder jsonContent = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                jsonContent.append(line);
            }
        }
        return jsonContent.toString();
    }
}
