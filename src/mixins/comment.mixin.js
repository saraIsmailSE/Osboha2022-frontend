export const commentMixin = {
  methods: {
    addComment(reply, comment_id, options) {
      const itemsKey = options?.itemsKey || "items";
      const totalItemsKey = options?.totalItemsKey || "totalItems";

      if (!comment_id) {
        this[itemsKey].push(reply);

        if (
          options?.incrementTotalItems === true ||
          options?.incrementTotalItems === undefined
        )
          this[totalItemsKey]++;
      } else {
        const comment = this.findComment(this[itemsKey], comment_id);
        comment.replies.push(reply);
      }
    },

    findComment(items, comment_id) {
      // Base case: if items is empty, return null
      if (items.length === 0) {
        return null;
      }

      // Recursive case: iterate through each item
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === comment_id) {
          return items[i];
        }

        // If there are replies, recursively search within them
        if (items[i].replies.length > 0) {
          const comment = this.findComment(items[i].replies, comment_id);
          if (comment) {
            return comment;
          }
        }
      }

      // If the comment is not found in the current level and its replies, return null
      return null;
    },

    deleteComment(comment_id, options) {
      const itemsKey = options?.itemsKey || "items";
      const totalItemsKey = options?.totalItemsKey || "totalItems";
      const type = options?.type || "thesis";

      for (let i = 0; i < this[itemsKey].length; i++) {
        if (this[itemsKey][i].id === comment_id) {
          if (type === "thesis") {
            this.$emit("updateBook", {
              comments_count: this.book.comments_count - 1,
              theses_count: this.book.theses_count - 1,
            });
            this[totalItemsKey]--;
          } else if (type === "rate") {
            const sum =
              parseInt(this.book.reviews_sum) - this[itemsKey][i].rate.rate;
            this.$emit("updateBook", {
              reviews_count: this.book.reviews_count - 1,
              reviews_sum: sum,
              rate: this.calculateAverageRate(sum, this.totalRates - 1),
              userRate: null,
            });
            this[totalItemsKey]--;
          } else if (type === "post") {
            this.decrementCommentsCount(this.post.id);
          }
          this[itemsKey].splice(i, 1);

          return;
        }

        //if the type is rate, we don't need to check for replies (no action will be taken)
        if (type === "rate") return;

        if (this[itemsKey][i].replies.length > 0) {
          for (let j = 0; j < this[itemsKey][i].replies.length; j++) {
            if (this[itemsKey][i].replies[j].id === comment_id) {
              if (type === "thesis") {
                this.$emit("updateBook", {
                  comments_count: this.book.comments_count - 1,
                });
              } else if (type === "post") {
                this.decrementCommentsCount(this.post.id);
              }
              this[itemsKey][i].replies.splice(j, 1);
            }
          }
        }
      }
    },

    editComment(comment, options) {
      const itemsKey = options?.itemsKey || "items";
      let commentToEdit = this.findComment(this[itemsKey], comment.id);
      commentToEdit.body = comment.body;
      commentToEdit.media = comment.media;
    },

    reactToComment(comment_id, status, options) {
      const itemsKey = options?.itemsKey || "items";

      let comment = this.findComment(this[itemsKey], comment_id);
      if (status) {
        comment.reactions_count++;
        comment.reacted_by_user = true;
      } else {
        comment.reactions_count--;
        comment.reacted_by_user = false;
      }
    },
  },
};
