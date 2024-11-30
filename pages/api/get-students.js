import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Define the file path
      const filePath = path.join(process.cwd(), 'students.json');

      // Read existing data
      let existingData = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        existingData = JSON.parse(fileData);
      }

      res.status(200).json(existingData);
    } catch (error) {
      console.error('Error reading the file:', error);
      res.status(500).json({ message: 'Failed to fetch data', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
