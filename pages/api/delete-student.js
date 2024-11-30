import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      console.log('Received student ID to delete:', id);

      // Define the file path
      const filePath = path.join(process.cwd(), '/java/students.json');
      console.log('File path:', filePath);

      // Read existing data
      let existingData = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        existingData = JSON.parse(fileData);
      }
      console.log('Existing data:', existingData);

      // Filter out the student to be deleted
      const updatedData = existingData.filter(student => student.id !== id);
      console.log('Updated data:', updatedData);

      // Save the updated data
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
      console.log('Student deleted successfully');

      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ message: 'Failed to delete student', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
