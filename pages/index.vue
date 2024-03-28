<script lang="ts" setup>
const { data } = useApiClient().helloName.useQuery();
const { data: changeName } = useApiClient().changeName.useQuery();

watchEffect(() => {
    console.log(data, changeName);
});
</script>

<template>
    <div>
        <Button>123</Button>
    </div>
</template>

<style lang="scss" scoped></style>
