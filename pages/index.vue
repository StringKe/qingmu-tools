<script lang="ts" setup>
const { data } = useApiClient().helloName.useQuery();
watchEffect(() => {
    console.log(data);
});
</script>

<template>
    <div>
        <Button>123</Button>
    </div>
</template>

<style lang="scss" scoped></style>
