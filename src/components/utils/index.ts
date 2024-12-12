import moment from "moment";

class Format {
  getDate = (
    date: Date | null | undefined | string,
    format: string = "MM/DD/YYYY - HH:mm:ss"
  ) => {
    if (!date) return "--";
    return moment(date).format(format);
  };

  // beforeUpload = (file: FileType) => {
  //   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  //   if (!isJpgOrPng) {
  //     toast.error("You can only upload JPG/PNG file!");
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     toast.error("Image must smaller than 2MB!");
  //   }
  //   return isJpgOrPng && isLt2M;
  // };

  getTimeSince = (date: Date | undefined | string) => {
    if (!date) return "---";

    const now = new Date();
    const postDate = new Date(date);
    const secondsPast = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (secondsPast < 60) {
      return `${secondsPast} seconds ago`;
    }
    if (secondsPast < 3600) {
      const minutes = Math.floor(secondsPast / 60);
      return `${minutes} minutes ago`;
    }
    if (secondsPast < 86400) {
      const hours = Math.floor(secondsPast / 3600);
      return `${hours} hours ago`;
    }
    if (secondsPast < 2592000) {
      // 30 days
      const days = Math.floor(secondsPast / 86400);
      return `${days} days ago`;
    }

    // Format as mm/dd/yyyy if older than 1 month
    const month = postDate.getMonth() + 1;
    const day = postDate.getDate();
    const year = postDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  convertLocalTimestampToUTC = (timestamp: number | undefined) => {
    if (typeof timestamp === "number") {
      const localDate = new Date();
      return timestamp - localDate.getTimezoneOffset() * 60000;
    }
    return undefined;
  };
}

export const _format = new Format();
