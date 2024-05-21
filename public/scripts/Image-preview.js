const ImagePreviewElement = document.getElementById('selected-image-preview')
const ImageUploaderElement = document.getElementById('product-image')

function showImagePreview(){
    const files = ImageUploaderElement.files
    if(!files || files.length === 0){
        ImagePreviewElement.style.display = 'none';
        return;
    }
    const pickedFile = files[0]
    ImagePreviewElement.src = URL.createObjectURL(pickedFile)
    ImagePreviewElement.style.display = 'block'
}

ImageUploaderElement.addEventListener('change', showImagePreview)