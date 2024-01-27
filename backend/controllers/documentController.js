const Document = require('../models/documentSchema');

exports.getDocument = async (req, res) => {
  const id = req.params.id; // Assuming the id is part of the URL
  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Invalid document ID',
    });
  }

  try {
    const document = await Document.findById(id);

    if (document) {
      return res.status(200).json({
        success: true,
        message: 'Document successfully fetched',
        document,
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Document not found',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

exports.updateDocument = async (req, res) => {
  const id = req.params.id; // Assuming the id is part of the URL
  const data = req.body.data; // Assuming the data is passed in the request body

  try {
    const updatedDocument = await Document.findByIdAndUpdate(id, { data }, { new: true });

    if (!updatedDocument) {
      return res.status(404).json({
        success: false,
        message: 'Document not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Document successfully updated',
      updatedDocument,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
