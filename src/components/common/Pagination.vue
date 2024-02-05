<template>
    <div class="row">
        <div class="col-xxl-12">
            <div class="basic-pagination mt-30">
                <ul class="d-flex align-items-center">
                    <li class="prev" v-if="page != 1">
                        <router-link :to="{
                            name: routeName,
                            query: { page: page - 1 }
                        }">
                            Prev
                            <i class="fas fa-chevron-circle-right"></i>
                        </router-link>
                    </li>
                    <li class="active">
                        <router-link :to="{
                            name: routeName,
                            query: { page: page }
                        }">
                            <span>{{ page }}</span>
                        </router-link>
                    </li>
                    <li class="next" v-if="hasNextPage">
                        <router-link :to="{
                            name: routeName,
                            query: { page: page + 1 }
                        }">
                            Next
                            <i class="fas fa-chevron-circle-left"></i>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaginationArea',
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

