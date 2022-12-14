import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage';



@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = "";
 



  constructor(private storage: Storage) { }



  public uploadImage($event: any, name: string) {
    const file = $event.target.files[0]
    console.log(file);
    let nameFile: string = (`image/` + name)
    const imgRef = ref(this.storage, nameFile)
    uploadBytes(imgRef, file)
      .then(response => { this.getImages(nameFile) })
      .catch(error => console.log(error))
  }

  getImages(nameFile: any) {
    const imagesRef = ref(this.storage, 'image')
    list(imagesRef)
      .then(async response => {
        for (let item of response.items) {
                   let nombre:string="image/"+item.name
          if (nombre == nameFile) {
            //console.log("La URL es:" + this.url)
            this.url = await getDownloadURL(item);
          }
        }
        console.log("La URL de la img es:" + this.url)
      }).catch(error => console.log(error))
  }


}