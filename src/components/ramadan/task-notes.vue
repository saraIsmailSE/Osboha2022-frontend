<template>
    <section>
        <div class="alert alert-danger p-1" role="alert" v-if="virtue_and_evidence">
            <h6>
                فضل المهمة ودليلها
                <span class="material-symbols-outlined align-middle">
                    favorite
                </span>

            </h6>
            <small>
                {{ virtue_and_evidence }}
            </small>

        </div>
        <div class="alert alert-warning p-1" role="alert" v-if="important_clarifications">
            <h6>
                توضيحات هامة للمهمة
                <span class="material-symbols-outlined align-middle">
                    report
                </span>

            </h6>
            <small>
                {{ important_clarifications }}
            </small>

        </div>
    </section>
</template>
<script>

export default {
    name: "Task Notes",
    props: {
        virtue_and_evidence: {
            type: String,
            required: true,
        },
        important_clarifications: {
            type: String,
            required: true,
        },

    },

};
</script>
