package student.hacks.submission;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ParseJson {
    public static List<SeatingChartOptimizer.Student> parseJsonData(String jsonData) {
        List<SeatingChartOptimizer.Student> students = new ArrayList<>();
        Pattern pattern = Pattern.compile("\\{[^}]+\\}");
        Matcher matcher = pattern.matcher(jsonData);

        while (matcher.find()) {
            String studentJson = matcher.group();
            SeatingChartOptimizer.Student student = parseStudent(studentJson);
            students.add(student);
        }
        return students;
    }

    private static SeatingChartOptimizer.Student parseStudent(String studentJson) {
        int id = Integer.parseInt(getValue(studentJson, "id"));
        String personality = getValue(studentJson, "personality");
        int bestFriendId = Integer.parseInt(getValue(studentJson, "bestFriendId"));
        boolean eyesightIssues = Boolean.parseBoolean(getValue(studentJson, "eyesightIssues"));
        String gender = getValue(studentJson, "gender");
        int noisinessLevel = Integer.parseInt(getValue(studentJson, "noisinessLevel"));
        double gpa = Double.parseDouble(getValue(studentJson, "gpa"));
        String favoriteSubject = getValue(studentJson, "favoriteSubject");
        int participationLevel = Integer.parseInt(getValue(studentJson, "participationLevel"));
        int attendanceConsistency = Integer.parseInt(getValue(studentJson, "attendanceConsistency"));

        return new SeatingChartOptimizer.Student(id, personality, bestFriendId, eyesightIssues, gender, noisinessLevel, gpa,
                favoriteSubject, participationLevel, attendanceConsistency);
    }

    private static String getValue(String json, String key) {
        String regex = "\"" + key + "\"\\s*:\\s*\"?([^\",}]+)\"?";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(json);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }
}
