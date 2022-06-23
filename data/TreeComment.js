
class TreeComment{
        constructor(id_comment,ID_Product,Name,username,img,content,isUser){
            this.id_comment=id_comment;
            this.ID_Product=ID_Product;
            this.Name=Name;
            this.username=username;
            this.img=img;
            this.content=content;
            this.isUser=isUser;
            this.children_comment = [];
        }

}

module.exports=TreeComment;