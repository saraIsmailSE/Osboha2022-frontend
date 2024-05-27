<template>
    <nav aria-label="...">
        <ul class="pagination">
            <li class="page-item ">
                <router-link class="page-link" :to="{
                    name: routeName,
                    query: { page: page - 1 }
                }" rel="prev" v-if="page != 1">
                    السابق
                </router-link>
            </li>
            <li class="page-item active" aria-current="page">
                <router-link class="page-link" :to="{
                    name: routeName,
                    query: { page: page }
                }">
                    {{ page }}
                </router-link>
            </li>
            <li class="page-item">
                <router-link class=" page-link" :to="{
                    name: routeName,
                    query: { page: page + 1 }
                }" rel="next" v-if="hasNextPage">
                    التالي
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'PaginationArea',
    created(){
    },
    props: {
        page: {
            type: [Number],
            default: 1,
            required: true,
        },
        total: {
            type: [Number],
            required: true,
        },
        perPage: {
            type: [Number],
            required: true,
        },
        routeName: {
            type: [String],
            required: true,
        },
    },

    computed: {
        hasNextPage() {
            return this.page < this.totalPages;
        },
        totalPages() {
            return Math.ceil(this.total / this.perPage);
        },

    }
};
</script>
<style scoped>
.pagination {
    display: flex;
    width: 290px;
    padding: 0;
}

.pagination a {
    flex: 1;
    text-decoration: none;
    color: #2c3e50;
}

#page-prev {
    text-align: left;
}

#page-next {
    text-align: right;
}
</style>
