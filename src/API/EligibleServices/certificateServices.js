import { api } from "../Intercepter";

class CertificateServices {
  constructor() {
    this.prefix = "eligible-certificates";
  }

  async getUserCertificates() {
    const response = await api.get(`${this.prefix}/user`);
    return response.data.data;
  }

  async createCertificate(id) {
    let certificateData = new FormData();
    certificateData.append("eligible_user_books_id", id);
    const response = await api
      .post(`${this.prefix}`, certificateData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((error) => {
        console.log(error);
      });

    return response.data.data;
  }
  async checkCertificate(id) {
    const response = await api.get(`userbook/certificate/${id}`);

    return response.data.data;
  }
  async fullCretificate(id) {
    try {
      const response = await api.get(`${this.prefix}/full-certificate/${id}`);
      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new CertificateServices();
