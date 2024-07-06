<template>
    <div class="alert alert-warning m-auto" v-if="availableBooks.length > 0">
        <h6> تتوفر كتب باسم مشابه</h6>
        <small v-for="book in availableBooks" :key="book.id">
            <router-link :to="{
                name: 'book.book-details',
                params: { book_id: book?.id },
            }" :title="book?.name">
                {{ book.name }}
            </router-link>
        </small>
    </div>
</template>
<script>
export default {
    name: "List Available Books",
    props: {
        availableBooks: { type: Object },
    },

};
</script>