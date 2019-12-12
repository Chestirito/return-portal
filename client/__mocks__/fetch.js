export default function() {
    return Promise.resolve({
      json: () =>
        Promise.resolve(
            product={
                image:{
                    src: "imageSourceURL"
                }
            }
        )
   
    })
  }