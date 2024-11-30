import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const studentData = req.body;
      console.log('Received student data:', studentData);

      // Define the file path
      const filePath = path.join(process.cwd(), 'students.json');
      console.log('File path:', filePath);

      // Read existing data with error handling for JSON parsing
      let existingData = [];
      if (fs.existsSync(filePath)) {
        try {
          const fileData = fs.readFileSync(filePath, 'utf-8');
          existingData = JSON.parse(fileData);
        } catch (parseError) {
          console.error('Error parsing JSON data:', parseError);
          // Initialize with empty array if parsing fails
          existingData = [];
        }
      }
      console.log('Existing data:', existingData);

      // Add new student data
      existingData.push(studentData);
      console.log('Updated data:', existingData);

      // Save updated data
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
      console.log('Data saved successfully');

      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error writing to file:', error);
      res.status(500).json({ message: 'Failed to save data', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
