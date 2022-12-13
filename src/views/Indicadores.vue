<template>
    <div>
        <b-container fluid>
            <b-row class="mt-4">
                <b-col>
                    <b-breadcrumb :items="items"></b-breadcrumb>
                </b-col>
            </b-row>

            <b-row>
                <b-col cols="12">
                    <b-card>
                        <b-form @submit.prevent="generar_graficas">
                            <b-row align-v="center">
                                <b-col cols="6">
                                    <b-form-group label="Zonas" label-class="font-weight-bold">
                                        <multiselect :closeOnSelect="false" required deselectLabel="" selectLabel="" selectedLabel="Seleccionada" :multiple="true" v-model="reporte.zonas" :options="zonas" :searchable="false"></multiselect>
                                    </b-form-group>
                                </b-col>
                                <!-- <b-col cols="2">
                                    <b-form-group label="De" label-class="font-weight-bold">
                                        <date-picker required v-model="reporte.de" :config="options"></date-picker>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="2">
                                    <b-form-group label="Hasta" label-class="font-weight-bold">
                                        <date-picker required v-model="reporte.hasta" :config="options"></date-picker>
                                    </b-form-group>
                                </b-col> -->
                                <b-col cols="2" class="text-left">
                                    <b-button variant="success" type="submit">
                                        Generar
                                        <font-awesome-icon icon="save" />
                                    </b-button>
                                </b-col>
                                <!-- <b-col cols="1" class="text-center" v-if="processChart">
                                    <b-spinner variant="primary" label="Spinning"></b-spinner>
                                </b-col> -->
                            </b-row>
                        </b-form>
            
                    </b-card>
                </b-col>
            </b-row>

            <!-- <b-row class="mt-4 mb-4">
                <b-col cols="8">
                    <b-card class="shadow-lg p-3 bg-white rounded">
                        <Indicador  :processChart="processChart" :config_reporte="reporte" @loadEnd="loadEnd" />
                    </b-card>
                </b-col>
                <b-col cols="4">
                    <b-row>
                        <b-col cols="12">
                            <b-card class="shadow-lg bg-white rounded">
                                <DonutTotales :processChart="processChart" :config_reporte="reporte" />
                            </b-card>
                        </b-col>
                        <b-col cols="12" class="mt-2">
                            <b-card class="shadow-lg bg-white rounded">
                                <IndicadorPonderado :processChart="processChart" :config_reporte="reporte" />
                            </b-card>
                        </b-col>
                    </b-row>
            </b-row> -->

            <b-row class="mt-3" v-if="!loadingIndicadores">
                <b-col cols="3" v-for="(indicador, key) in indicadores" :key="key">
                    <b-card class="shadow-lg p-3 mb-5 bg-white rounded">
                        <CircleChart :id_dependencia="indicador.id" url_data="indicador_dependencia" :title_chart="indicador.descripcion" :id_container="indicador.descripcion" :processChart="processChart" :config_reporte="reporte" @loadEnd="loadEnd" />
                    </b-card>
                </b-col>
            </b-row>

        </b-container>
    </div>    
</template>

<script>

    // import Indicador from '@/components/Indicadores/Indicador'
    import ProgressCircle from '@/components/Indicadores/ProgressCircle'
    import Multiselect from 'vue-multiselect'

    import CircleChart from '@/components/Indicadores/Circle'

    // import datePicker from 'vue-bootstrap-datetimepicker';
    // import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

    // import DonutTotales from '@/components/Indicadores/DonutTotales.vue'

    // import IndicadorPonderado from '@/components/Indicadores/IndicadorPonderado.vue'

    export default {
        components: {
            // Indicador,
            // datePicker,
            // eslint-disable-next-line vue/no-unused-components
            ProgressCircle,
            Multiselect,
            CircleChart,
            // DonutTotales,
            // IndicadorPonderado
        },
        data(){

            return{
                 items: [
                    {
                        text: 'Home',
                        href: '#/home'
                    },
                    {
                        text: 'Indicadores',
                        active: true
                    }
                ],
                zonas: [],
                indicadores: [],
                selected: null,
                reporte: {
                    zonas: {},
                    de: '01/2020',
                    hasta: '03/2020'
                },
                options: {
                    format: 'MM/YYYY',
                    useCurrent: false,
                    locale: 'es'
                },
                processChart: false,
                loadingIndicadores: false
            }

        },
        methods: {

            generar_graficas(){

                this.processChart = true

            },
            obtener_zonas(){

                let usuario = JSON.parse(localStorage.getItem('usuario'))

                this.axios
				.get(process.env.VUE_APP_API_URL + "zonas_usuario/" + usuario.id)
				// eslint-disable-next-line no-unused-vars
				.then(response => {
                    // eslint-disable-next-line no-undef
                    this.reporte.zonas = response.data
                    this.zonas = response.data
                    //this.processChart = true
				});

            },
            obtener_indicadores(){

                this.loadingIndicadores = true

                this.axios
				.get(process.env.VUE_APP_API_URL + "obtener_dependencias_datos")
				.then(response => {
                    this.indicadores = response.data
                    this.loadingIndicadores = false
                });
                
            },
            detalle_contactos_ingresados(){

            },
            loadEnd(){

                this.processChart = false

            },

        },
        computed: {

            grand_total: function(){

                // array.forEach(element => {
                    
                // });

                return 10

            }

        },
        mounted(){

            this.obtener_zonas()
            this.obtener_indicadores()
            
        }
    }
</script>