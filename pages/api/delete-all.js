import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'DELETE') {
      try {
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
  
        // Sets up the students to be deleted
        const updatedData = [];
        console.log('Updated data:', updatedData);
  
        // Save the updated data
        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
        console.log('Students deleted successfully');
  
        res.status(200).json({ message: 'Students deleted successfully' });
      } catch (error) {
        console.error('Error deleting students:', error);
        res.status(500).json({ message: 'Failed to delete students', error: error.message });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
