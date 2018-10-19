<template>
    <table class="table">

        <thead class="head">
            <tr>
                <th  scope="col">
                    <span>#</span>
                    
                </th>
                <th scope="col" >
                    <span>Имя узла</span>
                </th>
                <th scope="col">
                    <span>Ip-адрес</span>
                   
                </th>
                <th scope="col">
                    <span>Web-порт</span>
                   
                </th>
                <th scope="col">
                    <span>Тип узла</span>
                    
                </th>
                <th scope="col">
                    <span>Описание узла</span>
                    
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="node in nodes" v-bind:key="node.id">
                <th scope="row">{{node.id}}</th>
                <td>
                    <input type="text" id="nameNode" class="form-control" ref="nameNode" 
                        required
                        :value="node.name"
                        /> 
                </td>
                <td>
                    <input type="text" id="IPadress" class="form-control" placeholder="IP-адрес" ref="IPadress" 
                        pattern="((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)"
                        title="четыре чисела от 0 до 255, разделённых точками, например, 192.168.0.3"
                        :value="node.ip_adress"
                        />
                </td>
                <td>
                    <input type="text" id="WebPort" class="form-control" placeholder="Web-порт" ref="WebPort"
                        pattern="^(([0-9]{1,4})|([1-5][0-9]{4})|(6[0-4][0-9]{3})|(65[0-4][0-9]{2})|(655[0-2][0-9])|(6553[0-5]))$"
                        title="от 0 до 65535"
                        :value="node.web_port"
                        /> 
                </td>
                <td>
                    <select class="form-control" id="nodeType" :value="node.type_id">
                        <option value="1">control node</option>
                        <option value="2">storage node</option>
                        <option value="3">render node</option>
                        <option value="4">node js</option>
                        <option value="5">pacs</option>
                        <option value="6">nginx</option>
                    </select>
                </td>
                <td>
                    <textarea class="form-control" :value="node.description" />
                </td>
            </tr> 
        </tbody>

    </table>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import { IRootState, INode } from '../types';

export default Vue.extend ({
    created: function () {
        this.getAll();
        console.log(this.nodes)
    },
    computed: mapState([
        'nodes',
    ]),
  
    data () {
        //let arr= this.$store.state.profile.nodes;
        return {
            arr: "jj"
        }
    },
   /* computed: {
        nodes() {
            return this.arr;
        }
    },*/
    methods: {
        ...mapActions([
            'getAll',
        ])
    }
});
/*
@Component
    export default class Home extends Vue {
        
        created() {
            this.getAll();
        }

        
    }
*/
</script>

<style>
</style>