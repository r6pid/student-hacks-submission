import org.json.JSONArray;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class SeatingChartOptimizer {

    public static List<Student> readStudentsFromJson(String filePath) {
        List<Student> students = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            StringBuilder jsonContent = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonContent.append(line);
            }
            JSONArray jsonArray = new JSONArray(jsonContent.toString());
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                Student student = new Student(
                        jsonObject.getInt("id"),
                        jsonObject.getString("personality"),
                        jsonObject.getInt("bestFriendId"),
                        jsonObject.getBoolean("eyesightIssues"),
                        jsonObject.getString("gender"),
                        jsonObject.getInt("noisinessLevel"),
                        jsonObject.getDouble("gpa"),
                        jsonObject.getString("favoriteSubject"),
                        jsonObject.getInt("participationLevel"),
                        jsonObject.getInt("attendanceConsistency")
                );
                students.add(student);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return students;
    }

    // Inner class for Student
    static class Student {
        int id;
        String personality;
        int bestFriendId;
        boolean eyesightIssues;
        String gender;
        int noisinessLevel;
        double gpa;
        String favoriteSubject;
        int participationLevel;
        int attendanceConsistency;

        public Student(int id, String personality, int bestFriendId, boolean eyesightIssues, String gender,
                       int noisinessLevel, double gpa, String favoriteSubject, int participationLevel,
                       int attendanceConsistency) {
            this.id = id;
            this.personality = personality;
            this.bestFriendId = bestFriendId;
            this.eyesightIssues = eyesightIssues;
            this.gender = gender;
            this.noisinessLevel = noisinessLevel;
            this.gpa = gpa;
            this.favoriteSubject = favoriteSubject;
            this.participationLevel = participationLevel;
            this.attendanceConsistency = attendanceConsistency;
        }
    }

    // GridPosition for student placement
    static class GridPosition {
        int x, y;

        GridPosition(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    // Optimize the seating chart
    public static int[][] optimizeSeating(int[][] grid, List<Student> students) {
        int maxComfortScore = Integer.MIN_VALUE;
        int[][] bestChart = null;

        // Generate initial random seating
        int[][] currentChart = assignRandomSeating(grid, students);

        // Iterate to optimize seating
        for (int iteration = 0; iteration < 1000; iteration++) { // Reduced iterations for quick testing
            int[][] newChart = swapRandomSeats(currentChart, students);
            int comfortScore = calculateComfortScore(newChart, students);

            if (comfortScore > maxComfortScore) {
                maxComfortScore = comfortScore;
                bestChart = deepCopyGrid(newChart);
            }
        }

        return bestChart;
    }

    // Assign random seating to students
    public static int[][] assignRandomSeating(int[][] grid, List<Student> students) {
        int[][] seatingChart;
        List<GridPosition> seats = new ArrayList<>();
        Set<Integer> assignedStudents = new HashSet<>();

        // Collect available seat positions
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                if (grid[i][j] == 1) { // Only consider valid seats
                    GridPosition gp = new GridPosition(i, j);
                    seats.add(gp);
                }
            }
        }

        // Repeat until a valid seating chart is generated
        do {
            assignedStudents.clear();
            seatingChart = deepCopyGrid(grid);

            Collections.shuffle(seats); // Shuffle for randomness

            // Assign students to available seats
            for (int i = 0; i < students.size() && i < seats.size(); i++) {
                GridPosition seat = seats.get(i);
                Student student = students.get(i);

                if (!assignedStudents.contains(student.id)) {
                    seatingChart[seat.x][seat.y] = student.id;
                    assignedStudents.add(student.id);
                }
            }
        } while (hasDuplicates(seatingChart)); // Regenerate if duplicates are found

        return seatingChart;
    }

    // Swap two random students' seats
    public static int[][] swapRandomSeats(int[][] chart, List<Student> students) {
        int[][] newChart = deepCopyGrid(chart);
        Random rand = new Random();

        // Pick two unique students to swap
        int student1Index = rand.nextInt(students.size());
        int student2Index = rand.nextInt(students.size());

        while (student1Index == student2Index) {
            student2Index = rand.nextInt(students.size());
        }

        // Find their positions in the chart
        int student1Id = students.get(student1Index).id;
        int student2Id = students.get(student2Index).id;
        GridPosition pos1 = findStudentPosition(newChart, student1Id);
        GridPosition pos2 = findStudentPosition(newChart, student2Id);

        if (pos1 != null && pos2 != null) {
            // Swap the two students
            newChart[pos1.x][pos1.y] = student2Id;
            newChart[pos2.x][pos2.y] = student1Id;
        }

        return newChart;
    }

    // Calculate the comfort score of a seating chart
    public static int calculateComfortScore(int[][] chart, List<Student> students) {
        int score = 0;

        // Validate the seating chart for duplicates
        if (hasDuplicates(chart)) {
            return Integer.MIN_VALUE; // Return a very low score if duplicates are detected
        }

        // Calculate the comfort score
        for (Student student : students) {
            GridPosition position = findStudentPosition(chart, student.id);
            if (position == null) continue;

            int x = position.x;
            int y = position.y;

            // Eyesight issues (front row bonus)
            if (student.eyesightIssues && x < 3) score += 3;

            // Best friend proximity
            if (student.bestFriendId > 0) {
                GridPosition bestFriendPos = findStudentPosition(chart, student.bestFriendId);

                if (bestFriendPos != null) {
                    int distance = Math.abs(position.x - bestFriendPos.x) + Math.abs(position.y - bestFriendPos.y);

                    // Encourage proximity for compatible best friends
                    if (student.noisinessLevel < 5 && students.get(student.bestFriendId - 1).noisinessLevel < 5 &&
                            student.gpa >= 2.5 && students.get(student.bestFriendId - 1).gpa >= 2.5) {
                        if (distance <= 1) score += 2; // Bonus for being adjacent
                    }

                    // Penalize proximity for incompatible best friends
                    if ((student.noisinessLevel >= 5 || students.get(student.bestFriendId - 1).noisinessLevel >= 5) ||
                            (student.gpa < 2.5 || students.get(student.bestFriendId - 1).gpa < 2.5)) {
                        if (distance <= 1) score -= 3; // Penalty for being too close
                    }
                }
            }

            // Personality (introvert/extrovert)
            int neighbors = countNeighbors(chart, x, y);
            if (student.personality.equals("introvert")) score += (4 - neighbors);
            if (student.personality.equals("extrovert")) score += neighbors;

            // Noisiness level (keep noisy students apart)
            score -= student.noisinessLevel * neighbors;

            // GPA (bonus for better students closer to center)
            if (student.gpa >= 3.5 && isCenter(x, y, chart.length, chart[0].length)) {
                score += 5;
            }

            // Participation level (prefer front rows for high participants)
            if (student.participationLevel > 7 && x < 3) score += 3;

            // Attendance consistency (prefer middle rows for consistent attendees)
            if (student.attendanceConsistency > 90 && x >= 3 && x <= 6) score += 3;
        }

        return score;
    }

    // Check for duplicates in the seating chart
    public static boolean hasDuplicates(int[][] chart) {
        Set<Integer> seen = new HashSet<>();
        for (int[] row : chart) {
            for (int seat : row) {
                if (seat > 0) { // Ignore empty seats (denoted by 0)
                    if (seen.contains(seat)) {
                        return true; // Duplicate found
                    }
                    seen.add(seat);
                }
            }
        }
        return false; // No duplicates
    }

    // Find the position of a student in the chart
    public static GridPosition findStudentPosition(int[][] chart, int studentId) {
        for (int i = 0; i < chart.length; i++) {
            for (int j = 0; j < chart[i].length; j++) {
                if (chart[i][j] == studentId) {
                    return new GridPosition(i, j);
                }
            }
        }
        return null;
    }

    // Count the number of neighbors around a given position
    public static int countNeighbors(int[][] chart, int x, int y) {
        int[] dx = {-1, 1, 0, 0};
        int[] dy = {0, 0, -1, 1};
        int count = 0;

        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];
            if (nx >= 0 && nx < chart.length && ny >= 0 && ny < chart[0].length && chart[nx][ny] > 0) {
                count++;
            }
        }

        return count;
    }

    // Check if a position is in the center region
    public static boolean isCenter(int x, int y, int rows, int cols) {
        return x >= rows / 3 && x < 2 * rows / 3 && y >= cols / 3 && y < 2 * cols / 3;
    }

    // Create a deep copy of the seating grid
    public static int[][] deepCopyGrid(int[][] grid) {
        int[][] copy = new int[grid.length][];
        for (int i = 0; i < grid.length; i++) {
            copy[i] = grid[i].clone();
        }
        return copy;
    }

    // Display the seating chart
    public static void displaySeatingChart(int[][] chart) {
        for (int[] row : chart) {
            for (int seat : row) {
                System.out.print((seat > 0 ? seat : "X") + " ");
            }
            System.out.println();
        }
    }

    // Main method for running the simulation
    public static void main(String[] args) {
        // Step 1: Create the classroom grid
        int[][] classroomGrid = new int[10][10]; // 10x10 grid
        // Initialize the grid with a predefined pattern of seats (1 for seat, 0 for no seat)
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {
                classroomGrid[i][j] = (i + j) % 2 == 0 ? 1 : 0; // Example alternating seat pattern
            }
        }

        // Step 2: Gather the list of students
        List<Student> students = readStudentsFromJson("students.json");

        // Step 3: Run the seating chart optimization
        int[][] optimizedChart = optimizeSeating(classroomGrid, students);

        // Step 4: Display the optimized seating chart
        System.out.println("Optimized Seating Chart:");
        displaySeatingChart(optimizedChart);

        // Step 5: Display student details
        System.out.println("\nStudent Details:");
        for (Student student : students) {
            System.out.printf("ID: %d, Personality: %s, Best Friend: %d, Eyesight: %b, Gender: %s, "
                            + "Noisiness: %d, GPA: %.2f, Favorite Subject: %s, Participation: %d, Attendance: %d\n",
                    student.id, student.personality, student.bestFriendId, student.eyesightIssues,
                    student.gender, student.noisinessLevel, student.gpa, student.favoriteSubject,
                    student.participationLevel, student.attendanceConsistency);
        }
    }
}
